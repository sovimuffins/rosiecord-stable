import { exec } from "child_process";
class Shell {
    static async write(text) {
        return await new Promise((resolve) => {
            process.stdout.write(text.toString());
            resolve(text.toString());
        });
    }
    static async run(command = 'ls', after) {
        return await new Promise((resolve) => {
            exec(command, (stderr, stdout) => {
                after === null || after === void 0 ? void 0 : after(stderr, stdout);
                resolve(stdout);
            });
        });
    }
    static async runSilently(command = 'ls', after = (stderr, stdout) => { }) {
        return await new Promise((resolve) => {
            const finalCommand = command.includes('&')
                ? command.split('&')[0] + '> /dev/null ' + "&" + command.split('&')[1]
                : command + ' > /dev/null';
            exec(finalCommand, (stderr, stdout) => {
                after(stderr, stdout);
                resolve(stdout);
            });
        });
    }
}
;
class Colors {
    constructor() {
        this.RED = '\x1b[91m';
        this.GREEN = '\x1b[92m';
        this.BLUE = '\x1b[94m';
        this.PINK = '\x1b[95m';
        this.CYAN = '\x1b[96m';
        this.ENDC = '\x1b[0m';
    }
}
;
class Divider extends Colors {
    constructor(length) {
        super();
        this.length = length;
    }
    async logDivider() {
        await Shell.write(`${this.PINK}-${this.CYAN}~`.repeat(this.length) + '\n' + this.ENDC);
    }
}
;
class States extends Colors {
    constructor() {
        super();
        this.PENDING = `${this.PINK}[${this.CYAN}*${this.PINK}]${this.ENDC}`;
        this.FAILURE = `${this.PINK}[${this.CYAN}-${this.PINK}]${this.RED}`;
        this.SUCCESS = `${this.PINK}[${this.CYAN}+${this.PINK}]${this.GREEN}`;
    }
}
class Constants {
}
Constants.IPA_FETCH_LINK = "https://cdn.discordapp.com/attachments/1198847747344826528/1199179697209233438/Discord_116.0.ipa?ex=65c19a1f&is=65af251f&hm=beb2e83f343666cf01a17c30f321b3c3a8e4c5c2d599585cb36facd6bb14b531&";
export { Shell, Colors, Divider, States, Constants };
