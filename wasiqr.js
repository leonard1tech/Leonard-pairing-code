const PastebinAPI = require('pastebin-js'),
pastebin = new PastebinAPI('0029VahusSh0QeaoFzHJCk2x')
const {makeid} = require('./id');
const QRCode = require('qrcode');
const express = require('express');
const path = require('path');
const fs = require('fs');
let router = express.Router()
const pino = require("pino");
const {
	default: Wasi_Tech,
	useMultiFileAuthState,
	jidNormalizedUser,
	Browsers,
	delay,
	makeInMemoryStore,
} = require("@whiskeysockets/baileys");

function removeFile(FilePath) {
	if (!fs.existsSync(FilePath)) return false;
	fs.rmSync(FilePath, {
		recursive: true,
		force: true
	})
};
const {
	readFile
} = require("node:fs/promises")
router.get('/', async (req, res) => {
	const id = makeid();
	async function WASI_MD_QR_CODE() {
		const {
			state,
			saveCreds
		} = await useMultiFileAuthState('./temp/' + id)
		try {
			let Qr_Code_By_Wasi_Tech = Wasi_Tech({
				auth: state,
				printQRInTerminal: false,
				logger: pino({
					level: "silent"
				}),
				browser: Browsers.macOS("Desktop"),
			});

			Qr_Code_By_Wasi_Tech.ev.on('creds.update', saveCreds)
			Qr_Code_By_Wasi_Tech.ev.on("connection.update", async (s) => {
				const {
					connection,
					lastDisconnect,
					qr
				} = s;
				if (qr) await res.end(await QRCode.toBuffer(qr));
				if (connection == "open") {
					await delay(5000);
					let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
					await delay(800);
				   let b64data = Buffer.from(data).toString('base64');
				   let session = await Qr_Code_By_Wasi_Tech.sendMessage(Qr_Code_By_Wasi_Tech.user.id, { text: '' + b64data });
	
				   let WASI_MD_TEXT = `
*_Session Connected By LEONARD-MD*
*_Made in 🇹🇿_*
______________________________________
╔════════════════════════════╗
  🌟     ʟᴇᴏɴᴀʀᴅ-ᴍᴅ   ɪs ᴀᴄᴛɪᴠᴇ!   🌟
╚════════════════════════════╝
🔮 Session Connected 

███████████████████████████
🚀 ᴘʀᴇᴍɪᴜᴍ ᴇxᴘᴇʀɪᴇɴᴄᴇ ᴀᴄᴛɪᴠᴇᴛᴇᴅ
███████████████████████████

📢 ᴏғғɪᴄɪᴀʟ ᴜᴘᴅᴀᴛᴇs
├─ ✨ New Features: v3.0++
├─ 💎 Secret Menu: /leonardmenu
└─ 🔗 https://whatsapp.com/channel/0029VbAjawl9MF8vQQa0ZT32

███████████████████████████
💻 ᴅᴇᴠᴇʟᴏᴘᴇʀ ʜᴜʙ
├─ 🌐 GitHub: https://github.com/leonard1tech/LEONARD-MD
├─ ⭐ Star | 🍴 Fork | 💻 Contribute
└─ 📜 Docs: 255757103671

🛠 sᴜᴘᴘᴏʀᴛ
├─ 📧 Email: leonardtrch001@gmail.com
├─ 📞 WhatsApp: wa.me/255757103671
└─ 🐛 Bug Report: /reportbug

╔════════════════════════════╗
  💎 ʟᴇᴏɴᴀʀᴅ-ᴍᴅ ᴛᴇᴘᴇ /ʜᴇʟᴘ ғᴏʀ ᴍᴇɴᴜ
╚════════════════════════════╝
_____________________________________
	
_Don't Forget To Give Star To My Repo_`
	 await Qr_Code_By_Wasi_Tech.sendMessage(Qr_Code_By_Wasi_Tech.user.id,{text:WASI_MD_TEXT},{quoted:session})



					await delay(100);
					await Qr_Code_By_Wasi_Tech.ws.close();
					return await removeFile("temp/" + id);
				} else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
					await delay(10000);
					WASI_MD_QR_CODE();
				}
			});
		} catch (err) {
			if (!res.headersSent) {
				await res.json({
					code: "Service is Currently Unavailable"
				});
			}
			console.log(err);
			await removeFile("temp/" + id);
		}
	}
	return await WASI_MD_QR_CODE()
});
module.exports = router
