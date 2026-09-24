-- OPTIONAL. Run once, after 20260924000000_admin_foundation.sql.
-- Loads the placeholder content the website was designed with, so the public pages look the same as before the admin
-- existed. EVERYTHING BELOW IS INVENTED for layout purposes: the puppies (names, prices, stock photos) and above all the
-- testimonials (invented customers and quotes). Replace or delete them from /admin before launch; do not publish
-- fabricated reviews as real ones. Skip this file entirely to start with an empty site.

-- Newest first on the site, so kobe gets the latest created_at. Birth dates are worked back from the old "weeks old".
insert into public.puppies (id, name, price, gender, date_of_birth, color, status, image, created_at)
select id, name, price, gender, current_date - weeks * 7, color, 'available', '/images/puppies/' || id || '.jpg',
       now() - (pos - 1) * interval '1 minute'
from (values
  (1, 'kobe',  'Kobe',  900, 'Male',   12, 'Fawn'),
  (2, 'luna',  'Luna',  850, 'Female', 10, 'Fawn'),
  (3, 'zeus',  'Zeus',  950, 'Male',   14, 'Chocolate'),
  (4, 'bella', 'Bella', 875, 'Female', 11, 'Black'),
  (5, 'titan', 'Titan', 900, 'Male',   13, 'Blue & White'),
  (6, 'rosie', 'Rosie', 825, 'Female',  9, 'Cream'),
  (7, 'duke',  'Duke',  925, 'Male',   12, 'Chocolate'),
  (8, 'mia',   'Mia',   800, 'Female', 10, 'Blue & White')
) as p (pos, id, name, price, gender, weeks, color)
on conflict (id) do nothing;

-- Newest first, and the newest published review is the featured quote at the top of /testimonials.
insert into public.testimonials (name, location, puppy, rating, quote, created_at)
select name, location, puppy, 5, quote, now() - pos * interval '1 day'
from (values
  (1, 'Marcus T.', 'Atlanta, GA', 'Kobe',
   $q$From the first message to the day Kobe came home, everything was honest and easy. He was healthy, confident and already used to people. Best decision we've made as a family.$q$),
  (2, 'Jennifer & Dave R.', 'Austin, TX', 'Luna',
   $q$Luna arrived with her vet records, a feeding guide and a blanket that smelled like her littermates. You can tell these puppies are raised with real love.$q$),
  (3, 'Aaliyah M.', 'Houston, TX', 'Zeus',
   $q$Zeus is gentle with my kids and full of personality. RoyalCrest still checks in months later. That kind of support is rare.$q$),
  (4, 'Chris L.', 'Denver, CO', 'Titan',
   $q$I researched breeders for a long time. Seeing the pedigree and meeting the parents sold me, and Titan has been everything they promised.$q$),
  (5, 'Priya S.', 'Toronto, ON', 'Bella',
   $q$Shipping to Canada sounded scary, but we got updates the whole way and Bella stepped off the plane wagging her tail.$q$),
  (6, 'Tom & Beth W.', 'Phoenix, AZ', 'Duke',
   $q$Duke has the calm, steady temperament we were hoping for. Every question we had before and after pickup was answered quickly and kindly.$q$),
  (7, 'Danielle K.', 'Tampa, FL', 'Rosie',
   $q$Rosie is the sweetest dog I've ever owned. Thank you for trusting us with her.$q$),
  (8, 'Omar H.', 'Chicago, IL', 'Mia',
   $q$Clear communication, clear paperwork, and a healthy puppy. Mia settled in within a day and sleeps through the night already.$q$),
  (9, 'Rachel P.', 'Portland, OR', 'Nova',
   $q$We drove up to meet the litter and it felt like visiting family. Nova is well socialized, healthy and adored by everyone she meets.$q$)
) as t (pos, name, location, puppy, quote);

insert into public.faq_items (category, question, answer, sort_order) values
  ('About Our Puppies', 'Are your Pitbull puppies purebred?',
   $q$Our puppies are bred from carefully selected American Pitbull lines. Individual puppy pedigree and lineage information can be provided where applicable.$q$, 1),
  ('About Our Puppies', 'What is the temperament of your Pitbulls?',
   $q$We focus on producing dogs with stable, confident, affectionate temperaments. Early handling and socialization are an important part of our puppy-raising process.$q$, 2),
  ('About Our Puppies', 'Are your puppies raised around people?',
   $q$Yes. Puppies are handled regularly and introduced to normal household experiences, people, sounds, and age-appropriate environments to help encourage confident development.$q$, 3),
  ('About Our Puppies', 'Are your Pitbulls good with children and other pets?',
   $q$Individual temperament varies from dog to dog. We can discuss each puppy's observed personality and help prospective families choose a puppy that fits their household.$q$, 4),

  ('Health & Care', 'Do you offer a health guarantee?',
   $q$Yes. Each puppy is provided with our applicable health guarantee and health documentation. We recommend that every new puppy receive an examination by a licensed veterinarian after arriving home.$q$, 1),
  ('Health & Care', 'What vaccinations and deworming does my puppy receive?',
   $q$Puppies receive age-appropriate veterinary care, vaccinations and deworming before going to their new homes. The specific records provided with each puppy will depend on its age and veterinary schedule.$q$, 2),
  ('Health & Care', 'At what age can I take my puppy home?',
   $q$Puppies should remain with their mother and littermates until they are appropriately ready to transition to a new home. The exact pickup date depends on the puppy's age, development and veterinary requirements.$q$, 3),
  ('Health & Care', 'What should I feed my Pitbull puppy?',
   $q$We can provide guidance on the food your puppy has been eating and recommend maintaining a consistent diet initially before making gradual changes.$q$, 4),

  ('Breeding & Bloodlines', 'Can I see the puppy''s parents?',
   $q$Yes, where available, we can provide information and photographs of the puppy's parents and relevant bloodline information.$q$, 1),
  ('Breeding & Bloodlines', 'Can I see pedigree or bloodline information?',
   $q$Pedigree information is available for puppies where applicable. Contact us for the specific lineage documentation associated with the puppy you're interested in.$q$, 2),
  ('Breeding & Bloodlines', 'Do you breed different colors and sizes?',
   $q$Our dogs may vary in color, structure and size depending on the individual bloodline and breeding. Contact us about currently available puppies and upcoming litters.$q$, 3),

  ('Reservations & Purchase', 'How do I reserve a puppy?',
   $q$Start by contacting us about the puppy you're interested in. We'll discuss availability, answer your questions and explain the current reservation process.$q$, 1),
  ('Reservations & Purchase', 'What is included with my puppy purchase?',
   $q$The exact package can vary by puppy, but typically includes applicable health/veterinary records, care information and documentation provided with the puppy. We'll explain everything included before you complete your purchase.$q$, 2),
  ('Reservations & Purchase', 'What payment methods do you accept?',
   $q$Available payment methods and payment instructions are provided during the reservation process. Please contact us for the current options.$q$, 3),

  ('Shipping & Delivery', 'Do you offer puppy shipping?',
   $q$Yes, shipping options can be discussed for families who cannot personally collect their puppy. Available transportation options depend on the destination and applicable requirements.$q$, 1),
  ('Shipping & Delivery', 'How does puppy shipping work?',
   $q$We first prepare the puppy for travel, confirm the required health and travel documentation, arrange transportation, and provide the buyer with the relevant delivery information.$q$, 2),
  ('Shipping & Delivery', 'Will I receive updates during transportation?',
   $q$Yes. We provide available transportation and delivery updates throughout the journey so you know the status of your puppy's trip.$q$, 3),
  ('Shipping & Delivery', 'Can you ship internationally?',
   $q$International transportation may be possible depending on the destination and current animal-import requirements. We'll discuss the requirements and available options for your location before making arrangements.$q$, 4),

  ('After You Bring Your Puppy Home', 'Do you provide support after purchase?',
   $q$Yes. We want families to feel supported beyond the initial purchase and are available to answer reasonable questions about your puppy's transition and care.$q$, 1),
  ('After You Bring Your Puppy Home', 'Can I contact you if I have additional questions?',
   $q$Absolutely. If your question isn't answered on this page, use the contact form or contact information provided on the website.$q$, 2);
