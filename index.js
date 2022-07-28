#!/usr/bin/env gjs

imports.gi.versions.Gtk = '3.0';
const { Gtk, Gio, GLib, GObject } = imports.gi;

// Initialize Gtk application
Gtk.init(null);

// Load main window template file
const mainWindowTemplateFile = Gio.File.new_for_path('main.glade');
const [, mainWindowTemplate] = mainWindowTemplateFile.load_contents(null);

// Register main window class
const PendulumMainWindow = GObject.registerClass(
  {
    GTypeName: 'Gjs_PendulumMainWindow',
    Template: mainWindowTemplate,
    Children: ['statusButtons'],
    InternalChildren: ['statusButton0', 'statusButton1', 'statusButton2'],
  },
  class PendulumMainWindow extends Gtk.Window {
    /**
     * Constructor.
     *
     * @param {*} params
     */
    constructor(params = {}) {
      super(params);

      //
    }

    /**
     * When statusButton0 is clicked.
     *
     * @param {Gtk.Button} button
     */
    _onStatusButton0Clicked(button) {
      GLib.spawn_command_line_async(`node update_custom_status.js "smoking" "Smoking..."`);
      Gtk.main_quit();
    }

    /**
     * When statusButton1 is clicked.
     *
     * @param {Gtk.Button} button
     */
    _onStatusButton1Clicked(button) {
      GLib.spawn_command_line_async(`node update_custom_status.js "bath" "W.C"`);
      Gtk.main_quit();
    }

    /**
     * When statusButton2 is clicked.
     *
     * @param {Gtk.Button} button
     */
    _onStatusButton2Clicked(button) {
      GLib.spawn_command_line_async(`node update_custom_status.js "house_with_garden" "Working..."`);
      Gtk.main_quit();
    }
  }
);

// Create main window
const mainWindow = new PendulumMainWindow();

// Close window will exit application
mainWindow.connect('destroy', () => Gtk.main_quit());

// Show window
mainWindow.present();

// Start Gtk main loop
Gtk.main();
