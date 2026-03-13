import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/icebreaker-game/',
})
```
5. Click **Commit changes**

---

## Step 5 — Add a GitHub Actions file

This will auto-build and deploy your site every time you push.

1. In your repo, click **Add file** → **Create new file**
2. In the filename box type exactly:
```
.github/workflows/deploy.yml
