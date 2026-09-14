---
name: update-api-docs
description: Fetch OpenAPI/Swagger JSON specs from staging URLs and update the corresponding files in docs/Api/. Use when the user asks to update API docs, sync API specs, refresh API documentation, or mentions docs/Api JSON files.
---

# Update API Docs

Fetch each API spec and overwrite the corresponding local file.

## URL → File Mapping

| File | URL |
|------|-----|
| `docs/Api/dictionaries.json` | `https://staging.streamstack.cc/docs/dictionaries?dictionaries-docs.json` |
| `docs/Api/obs.json` | `https://staging.streamstack.cc/docs/obs?obs-docs.json` |
| `docs/Api/other.json` | `https://staging.streamstack.cc/docs/other?other-docs.json` |
| `docs/Api/partner.json` | `https://staging.streamstack.cc/docs/partner?partner-docs.json` |
| `docs/Api/streamer.json` | `https://staging.streamstack.cc/docs/streamer?streamer-docs.json` |
| `docs/Api/ads.json` | `https://staging.streamstack.cc/docs/ads?ads-docs.json` |

## Workflow

1. For each entry in the mapping above (or only the ones the user specified), fetch the URL using `curl`:

```bash
curl -s "https://staging.streamstack.cc/docs/dictionaries?dictionaries-docs.json" \
  -o docs/Api/dictionaries.json
```

2. Run all fetches in parallel when updating multiple files:

```bash
curl -s "https://staging.streamstack.cc/docs/dictionaries?dictionaries-docs.json" -o docs/Api/dictionaries.json &
curl -s "https://staging.streamstack.cc/docs/obs?obs-docs.json" -o docs/Api/obs.json &
curl -s "https://staging.streamstack.cc/docs/other?other-docs.json" -o docs/Api/other.json &
curl -s "https://staging.streamstack.cc/docs/partner?partner-docs.json" -o docs/Api/partner.json &
curl -s "https://staging.streamstack.cc/docs/streamer?streamer-docs.json" -o docs/Api/streamer.json &
curl -s "https://staging.streamstack.cc/docs/ads?ads-docs.json" -o docs/Api/ads.json &
wait
```

3. After fetching, verify each file is valid JSON (non-empty, not an error page):

```bash
for f in docs/Api/*.json; do
  python3 -c "import json,sys; json.load(open('$f'))" 2>/dev/null \
    && echo "OK: $f" || echo "INVALID: $f"
done
```

4. Report which files were updated successfully and flag any that failed validation.

## Notes

- Always run from the workspace root.
- If a specific file/spec is requested, only fetch that one.
- If curl returns an HTML error page instead of JSON, the file will fail validation — report it clearly and do not leave the corrupted file in place (restore from git if needed).
