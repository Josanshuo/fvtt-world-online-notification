import { registerSettings } from "./modules/settings.js";

export let i18n = key => {
    return game.i18n.localize(key);
};

export let setting = key => {
    return game.settings.get("world-notification", key);
};

export let patchFunc = (prop, func, type = "WRAPPER") => {
    let nonLibWrapper = () => {
        const oldFunc = eval(prop);
        eval(`${prop} = function (event) {
            return func.call(this, ${type != "OVERRIDE" ? "oldFunc.bind(this)," : ""} ...arguments);
        }`);
    }
    if (game.modules.get("lib-wrapper")?.active) {
        try {
            libWrapper.register("world-notification", prop, func, type);
        } catch (e) {
            nonLibWrapper();
        }
    } else {
        nonLibWrapper();
    }
}

export let sendMessage = (webhookURL, payload) => {
      var request = new XMLHttpRequest();

      request.open("POST", webhookURL);
      request.setRequestHeader('Content-type', 'application/json');
      request.send(JSON.stringify(payload));
}

export class WorldNotification extends Application {
}

Hooks.on("init", () => {
    registerSettings();
});

Hooks.on("ready", () => {
    if (game.user.isGM && setting("enable")) {
	let worldnamePlaceholder = "%worldname%";
        let webhook = setting("webhook");
	let username = setting("username");
	let avatar = setting("avatar");
	let openMessage = setting("open-message").replace(worldnamePlaceholder, game.world.title);
	let closeMessage = setting("close-message").replace(worldnamePlaceholder, game.world.title);
	let openImage = setting("open-image");
	let closeImage = setting("close-image");
        let payload = {
            username: username,
	    avatar_url: avatar,
            content: openMessage,
	    embeds: [{
		    image: {
		      url: openImage
		    }
		  }]
        };

        sendMessage(webhook, payload);
        patchFunc("Game.prototype.shutDown", async function (wrapped, ...args) {
            try {
		payload.content = closeMessage;
		payload.embeds = [{
		    image: {
		      url: closeImage
		    }
		  }];
                sendMessage(webhook, payload);
            } catch(e) {
                console.log("Wrapping Error!");
            }
            return wrapped(...args);
        });
    }
});

