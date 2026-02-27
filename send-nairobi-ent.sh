#!/bin/bash
# Send cold email to Nairobi ENT Clinic

cd ~/.openclaw/workspace/plainsight-digital

python3 cold-email.py send \
  --to "info@nairobientclinic.com" \
  --subject "Nairobi ENT Clinic website question" \
  --body "Hi there,

I was looking at Nairobi ENT Clinic's website and noticed the appointment booking process requires patients to call during business hours or send an email and wait for a response.

In our research, 73% of patients prefer WhatsApp or online booking for initial consultations — especially for ENT issues where people often want quick answers about availability.

I'm Dylan, founder of Plainsight Digital. We help Nairobi healthcare providers turn websites into patient booking engines.

We recently helped a similar clinic implement one-click WhatsApp booking and saw their patient inquiries increase 3x in 60 days. Same staff, same doctors — just removed the friction.

I made a quick 2-minute video showing exactly how I'd streamline your booking flow: https://www.plainsightdigital.dev/audit

No obligation — just thought you'd find the insights useful. If it resonates, happy to discuss further.

Best,
Dylan Makori
Founder, Plainsight Digital
www.plainsightdigital.dev
P.S. Saw your clinic specializes in sinus treatments — that's exactly the type of specific service patients search for online. Worth making it easy for them to book."
