class Settings {
    constructor(root) {
        this.root = root;
        this.platform = "WEB"; // 默认是web端
        if (this.root.AcWingOS) {
            this.platform = "ACAPP";
        }
        this.username = "";
        this.photo = "";
        this.start();
    }

    start() {//在创建的时候执行
        this.getinfo();
    }

    register() { //打开注册界面
    }

    login() {//打开登录界面
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
    }

    show() {
    }
}
