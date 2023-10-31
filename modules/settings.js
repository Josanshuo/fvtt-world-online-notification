import { i18n, setting } from "../main.js";

export const debouncedReload = foundry.utils.debounce(() => window.location.reload(), 100);

export const registerSettings = function () {
    let modulename = "world-notification";
    
    game.settings.register(modulename, "enable", {
        name: i18n("WORLDNOTIFICATION.enable.name"),
        hint: i18n("WORLDNOTIFICATION.enable.hint"),
        scope: "world",
        default: true,
        type: Boolean,
        onChange: debouncedReload,
        config: true
    });
    
    game.settings.register(modulename, "webhook", {
        name: i18n("WORLDNOTIFICATION.webhook.name"),
        hint: i18n("WORLDNOTIFICATION.webhook.hint"),
        scope: "world",
        default: "",
        type: String,
        onChange: debouncedReload,
        config: true
    });

    game.settings.register(modulename, "username", {
        name: i18n("WORLDNOTIFICATION.username.name"),
        hint: i18n("WORLDNOTIFICATION.username.hint"),
        scope: "world",
        default: "Heimdall",
        type: String,
        onChange: debouncedReload,
        config: true
    });

    game.settings.register(modulename, "avatar", {
        name: i18n("WORLDNOTIFICATION.avatar.name"),
        hint: i18n("WORLDNOTIFICATION.avatar.hint"),
        scope: "world",
        default: "",
        type: String,
        onChange: debouncedReload,
        config: true
    });

    game.settings.register(modulename, "open-message", {
        name: i18n("WORLDNOTIFICATION.open-message.name"),
        hint: i18n("WORLDNOTIFICATION.open-message.hint"),
        scope: "world",
        default: "Heros, the portal to %worldname% has opened. Be warned, I shall uphold my sacred oath to protect this realm as its gatekeeper. If you return threatens the safty of our homeland, my gate will remain shut and you will be left to die.",
        type: String,
        onChange: debouncedReload,
        config: true
    });

    game.settings.register(modulename, "open-image", {
        name: i18n("WORLDNOTIFICATION.open-image.name"),
        hint: i18n("WORLDNOTIFICATION.open-image.hint"),
        scope: "world",
        default: "https://media.tenor.com/fzqWiPFak3AAAAAd/cores-rainbow.gif",
        type: String,
        onChange: debouncedReload,
        config: true
    });

    game.settings.register(modulename, "close-message", {
        name: i18n("WORLDNOTIFICATION.close-message.name"),
        hint: i18n("WORLDNOTIFICATION.close-message.hint"),
        scope: "world",
        default: "Hurry up! The %worldname% portal is closing, I couldn't hold it anymore. Allfathers, let the dark magic flow through me one last ... time.",
        type: String,
        onChange: debouncedReload,
        config: true
    });

    game.settings.register(modulename, "close-image", {
        name: i18n("WORLDNOTIFICATION.close-image.name"),
        hint: i18n("WORLDNOTIFICATION.close-image.hint"),
        scope: "world",
        default: "https://media.tenor.com/TxklrTq454UAAAAC/star-seeds-vortex.gif",
        type: String,
        onChange: debouncedReload,
        config: true
    });
}
