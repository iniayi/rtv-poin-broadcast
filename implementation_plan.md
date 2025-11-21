# Implementation Plan - Automatic Broadcast Feature

## Goal Description
Add a feature to allow users to choose between "Manual" sending (clicking each button) and "Automatic" sending (iterating through the list and opening WhatsApp links automatically with a delay).

## User Review Required
> [!WARNING]
> **Popup Blockers**: Automatic sending relies on `window.open()`. Browsers may block multiple windows opening automatically. Users will need to allow popups for the site.

## Proposed Changes

### HTML Structure (`index.html`)
- Add a **Broadcast Control Panel** above the results table.
    - Toggle switch: Manual / Automatic.
    - **Automatic Mode Controls** (hidden by default):
        - "Start Broadcast" button.
        - "Pause/Stop" button.
        - "Delay" input (seconds).
        - Progress indicator (e.g., "Sending 5 of 100...").

### Styling (`style.css`)
- Style the toggle switch.
- Style the new control panel (glassmorphism to match).
- Add styles for "Active Row" in the table to highlight the customer currently being processed.

### Logic (`main.js`)
- **State Management**: Track `isBroadcasting`, `currentIndex`, `broadcastInterval`.
- **Functions**:
    - `toggleBroadcastMode(mode)`: Show/hide controls.
    - `startBroadcast()`:
        - Check for popup permission (try opening one).
        - Loop through `customerData` starting from `currentIndex`.
        - Open WhatsApp link.
        - Wait for `delay` seconds.
        - Update UI (highlight row, scroll to row).
    - `stopBroadcast()`: Clear interval.
    - `updateBroadcastProgress()`: Update status text.

## Verification Plan
### Manual Verification
1. **Toggle Mode**: Switch between Manual and Auto. Verify controls appear/disappear.
2. **Start Broadcast**: Click Start. Verify first link opens. Verify second link opens after delay.
3. **Stop/Pause**: Click Stop. Verify sending stops.
4. **Popup Blocker**: Verify browser asks for permission on first run.
