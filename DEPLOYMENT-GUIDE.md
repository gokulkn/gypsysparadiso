# Registration Page - Deployment Guide

## ✅ What's Done

Your **new registration page** is ready in `My-website/register.html`:
- ✅ Beautiful multi-step form (Wolfpack, Pact, Signature)
- ✅ Firebase already configured (using your existing config)
- ✅ Saves to `registrations` collection
- ✅ Manager App link updated to point to your website

---

## 🚀 Deployment Steps

### Step 1: Upload to Your Website

Since you already have the `My-website` folder structure:

1. **Upload the updated `register.html`** to your web hosting
   - Via cPanel File Manager, FTP, or Git
   - Replace the existing `register.html` file
   - Location: `public_html/register.html` (or your website root)

2. **Test the link:**
   - Visit: `https://gypsysparadiso.in/register?id=TEST123`
   - You should see the new multi-step form (not the old upload form)

---

### Step 2: Push Manager App Changes

The Manager App now points to your website URL:

```bash
cd gpmanager
git add .
git commit -m "Update registration link to website"
git push
```

After Vercel deploys:
- BCM links will use: `https://gypsysparadiso.in/register?id=...`
- Guests see only your website URL
- Data saves to same Firebase database

---

## 🧪 Testing Checklist

1. **Test the form:**
   - Open: `https://gypsysparadiso.in/register?id=TEST123`
   - Complete all 4 steps
   - Submit

2. **Verify in Firebase:**
   - Firebase Console → Firestore Database
   - Check `registrations` collection
   - Should see new document with `bookingId: "TEST123"`

3. **Verify in Manager App:**
   - Open Manager App → Bookings List
   - Find the test booking
   - Click "View Registration" - should show the data

4. **Test BCM Link:**
   - Create a real booking in Manager App
   - Click "Send BCM"
   - Check the WhatsApp message - link should be `gypsysparadiso.in/register?id=...`

---

## 🔄 What Changed

**Old Form (Replaced):**
- Simple ID upload only
- No guest details collection
- Basic UI

**New Form (Current):**
- Multi-step wizard (Intro → About You → Wolfpack → Safety → Pact)
- Collects: Name, Email, Address, ID Number, Fellow Guests, Emergency Contact
- Digital signature
- Premium UI with animations

---

## 📝 Next Steps

1. Upload `register.html` to your website
2. Push Manager App changes
3. Test with a dummy booking ID
4. Send real BCM links to guests!

---

## ❓ Need Help?

If you encounter issues:
- Check browser console for errors
- Verify Firebase config is correct (already set)
- Ensure website hosting allows JavaScript

The form is production-ready and uses your existing Firebase setup!
