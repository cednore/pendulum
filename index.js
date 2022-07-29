#!/usr/bin/env gjs

imports.gi.versions.Gtk = '3.0';
const { Gtk, Gio, GLib, GObject, Gdk } = imports.gi;

// Initialize Gtk application
Gtk.init(null);

// Load main window template file
const mainWindowTemplateFile = Gio.File.new_for_path('main.glade');
const [, mainWindowTemplate] = mainWindowTemplateFile.load_contents(null);

/**
 * Update custom status with emoji and text.
 *
 * @param {string} emoji - Custom status emoji
 * @param {string} text  - Custom status text
 */
const updateCustomStatus = (emoji, text) => {
  GLib.spawn_command_line_async(`node update_custom_status.js "${emoji}" "${text}"`);
};

/**
 * Lock screen.
 */
const lockScreen = () => {
  GLib.spawn_command_line_async(`xdg-screensaver lock`);
};

/**
 * Handle status button click event.
 *
 * @param {number} index
 */
const onStatusButtonClicked = (index) => {
  const statuses = [
    {
      emoji: 'smoking',
      text: 'Smoking...',
    },
    {
      emoji: 'bath',
      text: 'W.C',
    },
    {
      emoji: 'house_with_garden',
      text: 'Working...',
    },
  ];

  const status = statuses[index];
  if (status) {
    updateCustomStatus(status.emoji, status.text);
    lockScreen();
    Gtk.main_quit();
  }
};

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
      onStatusButtonClicked(0);
    }

    /**
     * When statusButton1 is clicked.
     *
     * @param {Gtk.Button} button
     */
    _onStatusButton1Clicked(button) {
      onStatusButtonClicked(1);
    }

    /**
     * When statusButton2 is clicked.
     *
     * @param {Gtk.Button} button
     */
    _onStatusButton2Clicked(button) {
      onStatusButtonClicked(2);
    }

    /**
     * Handle keypress.
     *
     * @param {Gtk.Widget} widget - Main window widget
     * @param {Gdk.Event}  event  - Keypress event
     */
    _onKeyPress(widget, event) {
      const [, keyval] = event.get_keyval();

      if (keyval === Gdk.KEY_Escape) {
        Gtk.main_quit();
      } else if (keyval === Gdk.KEY_s) {
        onStatusButtonClicked(0);
      } else if (keyval === Gdk.KEY_b) {
        onStatusButtonClicked(1);
      } else if (keyval === Gdk.KEY_w) {
        onStatusButtonClicked(2);
      }
    }
  }
);

// Create main window
const mainWindow = new PendulumMainWindow();

// Close window will exit application
mainWindow.connect('destroy', () => Gtk.main_quit());

// Show window
mainWindow.show_all();

// Start Gtk main loop
Gtk.main();
