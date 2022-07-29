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
      emoji: 'brb',
      text: 'BRB soon.',
      lock: true,
    },
    {
      emoji: 'computer',
      text: 'Working...',
      lock: false,
    },
    {
      emoji: 'zzz',
      text: 'Sleeping...',
      lock: true,
    },
    {
      emoji: 'smoking',
      text: 'Smoking...',
      lock: true,
    },
    {
      emoji: 'bath',
      text: 'W.C',
      lock: true,
    },
  ];

  const status = statuses[index];
  if (status) {
    updateCustomStatus(status.emoji, status.text);

    if (status.lock) {
      lockScreen();
    }

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
     * When statusButton3 is clicked.
     *
     * @param {Gtk.Button} button
     */
    _onStatusButton3Clicked(button) {
      onStatusButtonClicked(3);
    }

    /**
     * When statusButton4 is clicked.
     *
     * @param {Gtk.Button} button
     */
    _onStatusButton4Clicked(button) {
      onStatusButtonClicked(4);
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
      } else if (keyval === Gdk.KEY_b) {
        onStatusButtonClicked(0);
      } else if (keyval === Gdk.KEY_w) {
        onStatusButtonClicked(1);
      } else if (keyval === Gdk.KEY_z) {
        onStatusButtonClicked(2);
      } else if (keyval === Gdk.KEY_s) {
        onStatusButtonClicked(3);
      } else if (keyval === Gdk.KEY_c) {
        onStatusButtonClicked(4);
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

// Set normal BRB status when times out (5 seconds)
GLib.timeout_add(GLib.PRIORITY_DEFAULT, 5000, () => {
  onStatusButtonClicked(0);
  return GLib.SOURCE_REMOVE;
});

// Start Gtk main loop
Gtk.main();
