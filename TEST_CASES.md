# AI Scam Detector - Test Cases

## SCAM TEST CASES

### Test 1: Lottery/Prize Scam
```
Congratulations! You have won $1,000,000 in the Google Annual Lottery. To claim your prize, send us your bank details and pay a small processing fee of $50. Contact us immediately at winner@google-lottery.com!
```
**Expected:** Scam, High Risk

---

### Test 2: Phishing/Bank Scam
```
Dear Customer, Your account has been temporarily suspended due to suspicious activity. Please verify your identity immediately by clicking this link: http://bank-secure-verify.com/login
```
**Expected:** Scam, High Risk

---

### Test 3: Urgent Money Transfer Scam
```
URGENT: I am a prince from Nigeria and I need your help transferring $10 million out of my country. I will give you 30% if you help. Please reply with your bank account details immediately.
```
**Expected:** Scam, High Risk

---

### Test 4: Tech Support Scam
```
WARNING: Your computer has been infected with 5 viruses! Call Microsoft Support immediately at +1-800-123-4567 to fix this issue. Do not ignore this critical alert!
```
**Expected:** Scam, High Risk

---

### Test 5: Romance/Dating Scam
```
Hello my love, I am stuck at the airport and need $500 to clear customs. I promise to pay you back as soon as we meet. Please send via Western Union to my friend. I love you!
```
**Expected:** Scam, High Risk

---

### Test 6: Job Offer Scam
```
We saw your profile and want to hire you immediately! Work from home, earn $5000/week with no experience needed. Just pay $99 for the starter kit. Send money to get started today!
```
**Expected:** Scam, High Risk

---

### Test 7: Cryptocurrency Scam
```
Double your Bitcoin in 24 hours! Guaranteed 100% returns. Send 0.5 BTC to this address and receive 1 BTC back instantly. Limited time offer - only 10 spots left!
```
**Expected:** Scam, High Risk

---

### Test 8: Fake Delivery Scam
```
Your package delivery failed. Please click here to reschedule and pay a small redelivery fee of $2.99: http://fake-delivery-service.com/track
```
**Expected:** Scam, Medium Risk

---

### Test 9: Social Media Verification Scam
```
Your Instagram account will be deleted in 24 hours due to copyright violations. Verify your account now by clicking this link and entering your password: http://instagram-verify.com
```
**Expected:** Scam, High Risk

---

### Test 10: Tax/IRS Scam
```
This is the IRS. You owe $3,500 in back taxes. If you don't pay immediately via gift cards, we will send the police to arrest you. Call now: +1-888-IRS-FAKE
```
**Expected:** Scam, High Risk

---

## SAFE TEST CASES

### Test 11: Normal Friend Message
```
Hey! Are we still on for dinner this Friday at 7 PM? Let me know if you want to try that new Italian place downtown.
```
**Expected:** Safe, Low Risk

---

### Test 12: Work Email
```
Hi Team, Please review the attached quarterly report and send your feedback by Wednesday. The meeting is scheduled for Thursday at 10 AM in Conference Room B.
```
**Expected:** Safe, Low Risk

---

### Test 13: Family Message
```
Mom asked me to remind you about grandma's birthday party next Sunday. We're meeting at her house around 2 PM. Can you bring the cake?
```
**Expected:** Safe, Low Risk

---

### Test 14: E-commerce Order Confirmation
```
Thank you for your order #12345. Your package will be delivered between March 15-18. Track your shipment at our official website using your account.
```
**Expected:** Safe, Low Risk

---

### Test 15: Appointment Reminder
```
This is a reminder for your dentist appointment tomorrow at 3:30 PM with Dr. Smith. Please arrive 15 minutes early to complete any paperwork.
```
**Expected:** Safe, Low Risk

---

## EDGE CASES

### Test 16: Mixed/Legitimate Marketing
```
Hi! We noticed you left items in your cart. Here's a 10% discount code SAVE10 to complete your purchase. Valid for 48 hours. Shop now at our official store.
```
**Expected:** Safe or Medium Risk (legitimate marketing)

---

### Test 17: Vague but Potentially Legitimate
```
Your subscription is about to expire. Renew now to continue enjoying our services. Click here to manage your account settings.
```
**Expected:** Medium Risk (could be legitimate or phishing)

---

### Test 18: Short Message
```
Call me when you get a chance.
```
**Expected:** Safe, Low Risk

---

## HOW TO TEST

1. Open `frontend/index.html` in your browser
2. Copy any test case message above
3. Paste into the text area
4. Click **Analyze Message**
5. Compare the AI result with the expected output

## TIPS
- The AI may not always match "Expected" exactly - that's normal
- Risk levels can vary based on how the AI interprets the message
- Try modifying the messages slightly to see different results

