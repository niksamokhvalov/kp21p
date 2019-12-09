# KeePass to 1Password

Converts the KeePass (2.x) database XML file to a CSV file suitable for import into 1Password. Supported only [`Logins`](https://support.1password.com/create-csv-files/). Fields that are exported from KeePass:

- Title.
- URL.
- UserName.
- Password.
- Notes.

Tested on versions of KeePass 2.x and 1Password 7.

## Usage

0. [Install NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

1. Export KeePass database to XML file (for example: `keepass.xml`).

2. Open terminal:

```bash
npm i kp21p -g
kp21p --help
kp21p keepass.xml 1password.csv
```

3. Import CSV file to 1Password.