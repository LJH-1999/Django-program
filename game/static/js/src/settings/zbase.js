class Settings {
    constructor(root) {
        this.root = root;
        this.platform = "WEB"; // 默认是web端
        if (this.root.AcWingOS) {
            this.platform = "ACAPP";
        }
        this.username = "";
        this.photo = "";
        this.$settings = $(`
<div class="ac-game-settings">
    <div class="ac-game-settings-login">
        <div class="ac-game-settings-title">
            登录
        </div>
        <div class="ac-game-settings-username">
            <div class="ac-game-settings-item">
                <input type="text" placeholder="用户名">
            </div>
        </div>
        <div class="ac-game-settings-password">
            <div class="ac-game-settings-item">
                <input type="password" placeholder="密码">
            </div>
        </div>
        <div class="ac-game-settings-submit">
            <div class="ac-game-settings-item">
                <button>登录</button>
            </div>
        </div>
        <div class="ac-game-settings-error-messages">
            用户名密码错误
        </div>
        <div class="ac-game-settings-option">
            注册
        </div>
    </div>
    <div class="ac-game-settings-register">
    </div>
</div>
`);
        this.$login = this.$settings.find(".ac-game-settings-login");
        this.$login.hide();
        this.$register = this.$settings.find(".ac-game-settings-register");
        this.$register.hide();

        this.root.$ac_game.append(this.$settings);
        this.start();
    }

    start() {//在创建的时候执行
        this.getinfo();
    }

    register() { //打开注册界面
        this.$login.hide();
        this.$register.show();
    }

    login() {//打开登录界面
        this.$register.hide();
        this.$login.show();
    }

    getinfo() {//从服务器获取用户信息
        let outer = this;

        $.ajax({
            url: "https://app4189.acapp.acwing.com.cn/settings/getinfo/",
            type: "GET",
            data: {
                platform: outer.platform,
            },
            success: function(resp) {//resp是返回的dist
                console.log(resp);
                if (resp.result === "success") {
                    outer.username = resp.username;
                    outer.photo = resp.photo;
                    outer.hide();
                    outer.root.menu.show();
                } else {//否则要登录
                    outer.login();
                }
            }
        });
    }

    hide() {
        this.$settings.hide();
    }

    show() {
        this.$settings.show();
    }
}