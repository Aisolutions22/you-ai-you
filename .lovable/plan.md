# خطة النشر على Cloudflare Workers بحسابك + ربط you-ai.sa

المشروع مبني على TanStack Start + Cloudflare Workers (موجود `wrangler.jsonc` و `@cloudflare/vite-plugin`)، فهو جاهز فعلياً للنشر خارج Lovable على حسابك الخاص.

## 1) المتطلبات على جهازك

- حساب Cloudflare (لديك ✅)
- Node.js 20+ و Bun
- تثبيت Wrangler:
  ```bash
  bun add -D wrangler
  bunx wrangler login
  ```

## 2) تنزيل الكود من Lovable

- من Lovable: **GitHub → Connect to GitHub → Create Repository** ثم:
  ```bash
  git clone <your-repo>
  cd <repo>
  bun install
  ```

## 3) تعديلات على المشروع (سأنفذها في وضع Build)

- **`wrangler.jsonc`**: تغيير `name` إلى `you-ai` (بدل `tanstack-start-app`) وإضافة قسم النطاق:
  ```jsonc
  {
    "name": "you-ai",
    "main": "src/server.ts",
    "compatibility_date": "2025-09-24",
    "compatibility_flags": ["nodejs_compat"],
    "routes": [
      { "pattern": "you-ai.sa", "custom_domain": true },
      { "pattern": "www.you-ai.sa", "custom_domain": true }
    ]
  }
  ```
- إضافة سكربتات في `package.json`:
  ```json
  "deploy": "vite build && wrangler deploy",
  "cf:dev": "wrangler dev"
  ```
- التأكد أن الـ MCP endpoint (`/mcp`) و SSR (`src/server.ts`) شغالين على Workers — لا تعديل مطلوب.

> ملاحظة: بيئة Lovable Cloud (Supabase) ومفاتيح `SUPABASE_*` غير مستخدمة حالياً في الكود؛ لو أضفناها لاحقاً نضبطها عبر `wrangler secret put`.

## 4) النشر

```bash
bun run deploy
```
أول نشر ينشئ Worker باسم `you-ai` على حسابك.

## 5) ربط دومين you-ai.sa

- في لوحة Cloudflare: **Add a Site → you-ai.sa** ثم غيّر Nameservers عند مسجّل الدومين (.sa registrar عبر SaudiNIC) إلى الـ nameservers اللي Cloudflare يعطيك.
- بعد تفعيل الـ zone: الـ `routes` في `wrangler.jsonc` تربط `you-ai.sa` و `www.you-ai.sa` بالـ Worker تلقائياً عند `wrangler deploy` (يُنشئ Custom Domain و SSL).
- بديل يدوي: **Workers & Pages → you-ai → Settings → Domains & Routes → Add Custom Domain**.

## 6) بعد النشر

- تحقق: `https://you-ai.sa` و `https://you-ai.sa/mcp` و `https://you-ai.sa/connect`.
- حدّث `og:image` والـ canonical لو احتجنا (اختياري).

## ما أحتاج تأكيده منك قبل التنفيذ

1. اسم Worker المقترح `you-ai` — يناسبك أم تفضل اسم آخر؟
2. هل الدومين `you-ai.sa` مضاف بالفعل كـ Zone في Cloudflare؟ (لو لا، الخطوة الأولى تغيير الـ Nameservers.)
3. تريد `www.you-ai.sa` يعمل redirect إلى الجذر، أم يخدم نفس الموقع مباشرة؟
