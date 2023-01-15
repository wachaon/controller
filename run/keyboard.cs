using System;
using System.Runtime.InteropServices;

public class KeyboardSimulator {
    public static void Main (params string[] args) {
        string method = args[0];
        int key_code = Int32.Parse(args[1]);
        byte input = (byte)key_code;

        if (method == "send" || method == "press") {
            KeyDown(input);
        }
        if (method == "send" || method == "release") {
            KeyUp(input);
        }
    }

    [DllImport("user32.dll")]
    private static extern void keybd_event(byte bVk, byte bScan, uint dwFlags, uint dwExtraInfo);

    private const uint KEYEVENTF_EXTENDEDKEY = 0x1;
    private const uint KEYEVENTF_KEYUP = 0x2;

    public static void KeyDown(byte key) {
        keybd_event(key, 0, KEYEVENTF_EXTENDEDKEY, 0);
    }

    public static void KeyUp(byte key) {
        keybd_event(key, 0, KEYEVENTF_EXTENDEDKEY | KEYEVENTF_KEYUP, 0);
    }
}
