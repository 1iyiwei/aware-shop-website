/* Private beta sign-ups → a Google Sheet. Free, and the list stays in your own Google Drive.

   This runs in Google Apps Script, not on the website. Setup is in README.md ("Private beta sign-ups"):
   paste this whole file into Extensions → Apps Script of the sheet that should hold the list, then
   deploy it as a web app and put the web app's URL in BETA_ENDPOINT in index.html.

   Each sign-up adds one row (time, email) to a tab called "Sign-ups", which is created on the first one.
   An address that's already on the list isn't added twice. */

const SHEET_NAME = 'Sign-ups';

function doPost(e) {
  const p = (e && e.parameter) || {};
  if (p._gotcha) return reply({ ok: true }); // the hidden field only bots fill in: answer as usual, save nothing

  const email = String(p.email || '').trim().toLowerCase();
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return reply({ ok: false, error: 'invalid email' });

  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000); // two sign-ups at the same moment can't overwrite each other
    const sheet = signupSheet();
    const rows = sheet.getLastRow() - 1;
    const known = rows > 0 ? sheet.getRange(2, 2, rows, 1).getValues().map(r => String(r[0]).toLowerCase()) : [];
    if (known.indexOf(email) < 0) sheet.appendRow([new Date(), asText(email)]);
    return reply({ ok: true });
  } catch (err) {
    console.error(err);
    return reply({ ok: false, error: 'not saved' });
  } finally {
    lock.releaseLock();
  }
}

/* Opening the web app's URL in a browser shows this, which is a quick way to check the deployment is live. */
function doGet() {
  return reply({ ok: true, info: 'Private beta sign-ups are sent here from the website.' });
}

function signupSheet() {
  const book = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = book.getSheetByName(SHEET_NAME) || book.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Signed up', 'Email']);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, 2).setFontWeight('bold');
  }
  return sheet;
}

/* An address can legally start with = + or -, which Sheets would read as a formula. A leading ' keeps it plain text. */
function asText(value) {
  return /^[=+\-@]/.test(value) ? "'" + value : value;
}

function reply(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON);
}
