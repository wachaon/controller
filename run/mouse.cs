using System;
using System.Runtime.InteropServices;

public class MouseSimulator {
    public static void Main (params string[] args) {
        string method = args[0];
        int posX = args.Length > 1 ? Int32.Parse(args[1]) : 0;
        int posY = args.Length > 2 ? Int32.Parse(args[2]) : 0;

        if (method == "pos") {
            SetCursorPos(posX, posY);
        }

        if (method == "click" || method == "leftDown") {
            mouse_event(0x2, posX, posY, 0, 0);
        }
        if (method == "click") {
            mouse_event(0x4, 0, 0, 0, 0);
        }

        if (method == "leftUp") {
            mouse_event(0x4, posX, posY, 0, 0);
        }

        if (method == "rightClick" || method == "rightDown") {
            mouse_event(0x8, posX, posY, 0, 0);
        }
        if (method == "rightClick") {
            mouse_event(0x10, 0, 0, 0, 0);
        }
        if (method == "righttUp") {
            mouse_event(0x10, posX, posY, 0, 0);
        }
    }

    [DllImport("USER32.dll", CallingConvention = CallingConvention.StdCall)]
    public static extern void SetCursorPos(int X, int Y);

    [DllImport("USER32.dll", CallingConvention = CallingConvention.StdCall)]
    public static extern void mouse_event(int dwFlags, int dx, int dy, int cButtons, int dwExtraInfo);
}
