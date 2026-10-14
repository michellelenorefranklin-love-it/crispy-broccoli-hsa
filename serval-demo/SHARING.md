# Sharing the demo

Five ways to get the demo in front of people, from most to least interactive.

| Option | Best for | Interactive? | Needs |
|---|---|---|---|
| 1. Private web link | Colleagues and the client team exploring on their own | Yes | Recipients need access to the link (you grant it) |
| 2. Send the file | People who can't open external links | Yes | A modern browser; nothing to install |
| 3. Host it internally | A longer-running pilot or workshop series | Yes | A static web host |
| 4. Live screen share | Remote presentations | You drive | Teams / Zoom / Webex |
| 5. Video | Async viewing, pre-reads, people who missed the session | No | A video player |

## 1. Private web link (claude.ai)

The demo is published as a private claude.ai artifact. Only you can open it until you share it from the page's **Share** menu. Each viewer gets their own copy of the demo state, so one person's clicks don't affect anyone else. Every viewer should click **Reset demo** before walking through it.

## 2. Send the file

`dist/index.html` is the whole demo in one ~1 MB file. It opens by double-clicking and works offline.

- **Email:** many corporate mail gateways block `.html` attachments. Zip it first (`serval-demo.zip`), or share it through OneDrive / SharePoint / Teams Files.
- **SharePoint / OneDrive:** recipients must **download** the file and open it locally. SharePoint's in-browser preview won't run the demo.
- **Rebuild after changes:** run `npm run build`; the new file replaces the old one.

## 3. Host it internally

Any static web host works: an internal web server, Azure Static Web Apps, AWS S3 + CloudFront, Netlify, or GitHub Pages (only from a private or enterprise-controlled repo). Upload `dist/index.html`; nothing else is needed. The demo makes no network calls, sets no cookies, and stores state only in the viewer's browser.

## 4. Live screen share

- Share the **browser window** (not the whole screen), so presenter notes and your speaker script on the other screen stay private.
- Set the browser window to about 1440×900, and use **A+** for 110% text so it reads well when compressed.
- Keep the speaker script in a second window: sidebar → **Open speaker script**.

## 5. Video

### Captioned walkthrough (automatic)

```sh
npm run build
npm run video     # → video/serval-demo-walkthrough.mp4 (+ .srt captions)
```

This drives the real demo through all 14 steps at 1440×900, with a visible cursor and the speaker-script lines as on-screen captions. It also writes a separate `.srt` caption file. It needs Playwright with Chromium and ffmpeg. Editing `src/demo/speakerScript.ts` changes the captions next time you run it.

### Narrated by you (recommended for the client)

A real voice is more persuasive than captions. Run the guided demo and read the speaker script while recording with any of these:

- **Teams:** start a meeting with yourself, share the window, and click **Record**.
- **PowerPoint:** **Insert → Screen Recording** (records the screen and your voice).
- **Windows:** Snipping Tool → **Record**, or **Win + Alt + R** (Xbox Game Bar).
- **Mac:** **Cmd + Shift + 5** → Record selected portion (choose your microphone under *Options*).
- **Loom / OBS:** if your firm allows them.

Tips: reset first, do one rehearsal take, and keep it under 12 minutes. A 5-minute executive cut works well (steps 2, 4, 5, 7, 11, 14 in the speaker script).

## Before you share outside the team

- Keep the **"Simulated environment — illustrative only"** banner. Don't crop it out of videos or screenshots.
- Use the client's name or logo (`src/config/client.ts`) only with their approval. The default is "the Client".
- Serval and ServiceNow are named as the platforms under discussion. The demo makes no claims about their configuration in the client's environment; items marked **Needs validation** must be confirmed with the vendor.
