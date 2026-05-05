-- =============================================
-- Wallpapers Multi-Category Migration
-- =============================================

-- 1. Add the category_ids array column
ALTER TABLE wallpapers ADD COLUMN IF NOT EXISTS category_ids UUID[] DEFAULT '{}';

-- 2. Port existing data from single category_id to the new array
UPDATE wallpapers 
SET category_ids = ARRAY[category_id] 
WHERE category_id IS NOT NULL AND array_length(category_ids, 1) IS NULL;

-- 3. Create a GIN index for lightning-fast array queries (<100ms)
CREATE INDEX IF NOT EXISTS idx_wallpapers_category_ids_gin ON wallpapers USING GIN(category_ids);

-- Note: We can optionally drop the old category_id later
-- ALTER TABLE wallpapers DROP COLUMN category_id;
