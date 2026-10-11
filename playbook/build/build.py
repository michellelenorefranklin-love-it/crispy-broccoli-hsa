#!/usr/bin/env python3
"""Build the playbook: Markdown chapters -> HTML -> PDF (two passes for TOC page numbers)."""
import glob, html, os, re, subprocess, sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
CHAPTERS = sorted(glob.glob(os.path.join(ROOT, 'chapters', '*.md')))
OUT_HTML = os.path.join(HERE, 'playbook.html')
OUT_PDF = os.path.join(ROOT, 'Agentic-Board-OCM-Playbook.pdf')

PARTS = {
    '01': ('Part I', 'Foundations', 'Why the board exists, how the human stays in command, how the board is organized, and what every advisor is made of.'),
    '05': ('Part II', 'Operating the Board', 'The shared Context Brief, the Operating Charter, the standard response format, the five-step workflow, the four operating modes, and the Board Chair.'),
    '09': ('Part III', 'The Advisor Playbooks', 'One chapter per advisor, in a common structure: when to call them, what to give them, how they work, what they deliver, and how they will challenge you.'),
    '19': ('Part IV', 'Applying the Board', 'The first 30 days of a global ERP program, and a play for every stage of the change lifecycle.'),
    '21': ('Part V', 'Quality and Responsible Use', 'How to test the personas, score their outputs, and use the board safely with client information.'),
    '23': ('Part VI', 'Implementation', 'The five-phase roadmap from configured personas to an orchestrated board, and a plan for the pilot.'),
    '24': ('Appendices', 'Tools and Reference', 'Configuration prompts, a prompt library, a deliverables index and RACI, and a glossary.'),
}

COVER = '''<section class="cover">
<div class="kicker">Operating playbook · October 2026</div>
<div>
<div class="bar"></div>
<h1 class="title">The Agentic Board of Change Advisors</h1>
<div class="sub">How an organizational change lead works with ten AI advisors and a Board Chair to deliver senior-level change work, with the human in the loop at every decision.</div>
<div class="grid">
<span class="g-a">Vision</span><span class="g-a">Stakeholders</span><span class="g-a">Experience</span><span class="g-b">Readiness</span><span class="g-b">Impact &amp; Risk</span>
<span class="g-b">Champions</span><span class="g-c">Communications</span><span class="g-c">Training</span><span class="g-c">Deployment</span><span class="g-d">Analytics</span>
<span class="chair">Board Chair synthesizes advice and resolves conflicts</span>
</div>
</div>
<div class="byline"><b>Michelle Franklin</b> · Director, Organizational Change Management – US</div>
</section>'''


def title_of(md):
    m = re.search(r'^# (.+)$', md, re.M)
    return m.group(1).strip() if m else '?'


def slug(n):
    return 'ch-' + n


def assemble(pages):
    toc = ['<section class="toc"><h1 id="contents">Contents</h1>']
    body = []
    for path in CHAPTERS:
        base = os.path.basename(path)
        n = base[:2]
        md = open(path, encoding='utf-8').read()
        t = title_of(md)
        if n in PARTS:
            p, name, desc = PARTS[n]
            toc.append(f'<div class="part">{p} · {name}</div>')
            body.append(f'<div class="part-divider" id="part-{n}"><div class="num">{p}</div><div class="bar"></div>'
                        f'<div class="name">{name}</div><div class="desc">{desc}</div></div>\n')
        pn = pages.get(n, '')
        toc.append(f'<div class="row"><span class="t">{html.escape(t)}</span><span class="dots"></span><span class="pn">{pn}</span></div>')
        md = re.sub(r'^# (.+)$', lambda m: f'# {m.group(1)} {{#{slug(n)}}}', md, count=1, flags=re.M)
        body.append(md + '\n\n')
    toc.append('</section>')
    return '\n'.join(toc), ''.join(body)


def render(pages):
    toc, md = assemble(pages)
    src = os.path.join(HERE, '_all.md')
    open(src, 'w', encoding='utf-8').write(md)
    body = subprocess.run(['pandoc', src, '-f', 'markdown+pipe_tables+task_lists-implicit_figures-smart',
                           '-t', 'html5', '--wrap=none'], check=True, capture_output=True, text=True).stdout
    body = re.sub(r'<colgroup>.*?</colgroup>', '', body, flags=re.S)
    tpl = open(os.path.join(HERE, 'template.html'), encoding='utf-8').read()
    doc = tpl.replace('$title$', 'The Agentic Board of Change Advisors — Operating Playbook') \
             .replace('$body$', COVER + '\n' + toc + '\n' + body)
    open(OUT_HTML, 'w', encoding='utf-8').write(doc)
    env = dict(os.environ, NODE_PATH=subprocess.run(['npm', 'root', '-g'], capture_output=True, text=True).stdout.strip())
    subprocess.run(['node', os.path.join(HERE, 'render.cjs'), OUT_HTML, OUT_PDF], check=True, env=env)
    # Re-render the cover without the running footer and swap it in as page 1.
    cover_html = os.path.join(HERE, '_cover.html')
    open(cover_html, 'w', encoding='utf-8').write(tpl.replace('$title$', 'Cover').replace('$body$', COVER))
    tmp = os.path.join(HERE, '_tmp')
    os.makedirs(tmp, exist_ok=True)
    subprocess.run(['node', os.path.join(HERE, 'render.cjs'), cover_html, os.path.join(tmp, 'cover.pdf'), 'nofooter'], check=True, env=env)
    subprocess.run(['pdfseparate', '-f', '1', '-l', '1', os.path.join(tmp, 'cover.pdf'), os.path.join(tmp, 'c%d.pdf')], check=True)
    subprocess.run(['pdfseparate', '-f', '2', OUT_PDF, os.path.join(tmp, 'b%04d.pdf')], check=True)
    parts = [os.path.join(tmp, 'c1.pdf')] + sorted(glob.glob(os.path.join(tmp, 'b*.pdf')))
    subprocess.run(['pdfunite'] + parts + [OUT_PDF], check=True)
    subprocess.run(['rm', '-rf', tmp, cover_html])


def find_pages():
    text = subprocess.run(['pdftotext', '-layout', OUT_PDF, '-'], check=True, capture_output=True, text=True).stdout
    pages = text.split('\f')
    found = {}
    for path in CHAPTERS:
        n = os.path.basename(path)[:2]
        t = re.sub(r'\s+', ' ', title_of(open(path, encoding='utf-8').read()))
        key = t[:28]
        for i, pg in enumerate(pages[2:], start=3):  # skip cover and first TOC page
            head = re.sub(r'\s+', ' ', ' '.join(pg.strip().splitlines()[:4]))
            if key in head and 'Contents' not in head:
                found[n] = i
                break
    return found, len(pages) - (1 if pages and not pages[-1].strip() else 0)


if __name__ == '__main__':
    render({})
    pages, total = find_pages()
    render(pages)
    pages2, total = find_pages()
    if pages2 != pages:
        render(pages2)
    os.remove(os.path.join(HERE, '_all.md'))
    words = sum(len(open(p, encoding='utf-8').read().split()) for p in CHAPTERS)
    print(f'chapters={len(CHAPTERS)} words={words} pages={total} missing={[os.path.basename(p)[:2] for p in CHAPTERS if os.path.basename(p)[:2] not in pages2]}')
