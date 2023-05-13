import { Injector, Logger, common, settings } from "replugged";
import { PermissionStore } from "./lib/requiredModules";
import { defaultSettings } from "./lib/consts";
import { registerSettings } from "./Components/Settings";
import * as Utils from "./lib/utils";
import "./style.css";
export const PluginInjector = new Injector();
export const PluginLogger = Logger.plugin("ShowHiddenChannels");
export const SettingValues = await settings.init("dev.tharki.ShowHiddenChannels", defaultSettings);
export const { lodash } = common;
export const originalCan = PermissionStore?.can?.prototype?.constructor;
import { applyInjections } from "./patches/index";
const addChangeListener = (): void => {
  PluginInjector.after(SettingValues, "set", () => {
    Utils.rerenderChannels();
  });
};
export const start = (): void => {
  registerSettings();
  applyInjections();
  addChangeListener();
  Utils.rerenderChannels();
};

export const stop = (): void => {
  PluginInjector.uninjectAll();
  Utils.rerenderChannels();
};

export { makeSHCContextMenuEntry, makeChannelBrowerLockIcon } from "./patches/index";

export { Settings } from "./Components/Settings";
