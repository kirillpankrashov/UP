# Pusher

The `Pusher` class is responsible for initializing Laravel Echo and subscribing to all real-time widget events.

---

## Initialization

Starts on widget startup. Creates a single connection and stores it globally — repeated initialization when a connection already exists is ignored.

Widget channel name: `uplify.ads.{slug}`

Private channel authorization — POST request to `{API_URL}/broadcasting/auth` with `socket_id`, `channel_name`, `slug`.

---

## Public Channel

```
channel: uplify.ads.{slug}
```

| Event | Description |
|---|---|
| `.pusher:subscription_count` | Tracks the number of active widget tabs |

If more than one tab is open — API requests and chat message sending are blocked (only one copy runs at a time).

---

## Private Channel

```
private channel: private-uplify.ads.{slug}
```

### On connection

| Event | Description |
|---|---|
| `.pusher:subscription_succeeded` | Sends current session data to the debug tool |

### Widget settings

| Event | Description |
|---|---|
| `.widget.params.updated` | Updates widget settings on the fly without a page reload |
| `.widget.refresh` | Reloads the widget page |

### Advertising

| Event | Description |
|---|---|
| `.auto.launch` | Receives a batch of creatives for display and resets the next request timer; checks the widget version |
| `.manual.launch` | Immediately starts ad playback from the queue (manual mode) |

### Demo mode

| Event | Description |
|---|---|
| `.demo.real.launch` | Starts a demo display with real ad campaigns (from the debug section in the streamer/partner dashboard) |
| `.demo.launch` | Starts a test demo display |
| `.demo.referral.launch` | Starts a referral demo display |

### Other

| Event | Description |
|---|---|
| `.chatbot.disconnected` | Disables the chatbot — UI shows a warning |
| `.conversion.alert.approved` | Shows a conversion notification |

### Commented out

`.referral.launch` — referral advertising. Logic exists in code but is disabled.

---

## Debug Events (client whispers)

Used by the debug tool. Listened on the private channel as `.client-{name}`.

| Event | Description |
|---|---|
| `.client-debugger.connection` | Reads current OBS settings and sends them to the debugger |
| `.client-obs.settings.defaults` | Applies default OBS settings |
| `.client-obs.settings.custom` | Applies provided custom OBS settings |
| `.client-widget.refresh` | Reloads the widget page |
| `.client-ping.sessions` | Sends current session data to the debugger |
| `.client-delete.session` | Closes the OBS layer for the specified session |

---

## Version Check

Happens on every ad batch received. If the widget version has changed since the last request — the page reloads (new code deployed).
