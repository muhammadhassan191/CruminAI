import asyncio
from playwright.async_api import async_playwright
from supabase import create_client, Client
import os
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.getenv("VITE_SUPABASE_URL")
SUPABASE_KEY = os.getenv("VITE_SUPABASE_ANON_KEY")

async def run_lead_scraper(industry: str, location: str, limit: int = 15, title: str = None, employee_count: str = None):
    supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
    
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        # Use a real user agent to avoid immediate detection
        context = await browser.new_context(
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        )
        page = await context.new_page()
        
        search_query = f"{industry} in {location}"
        print(f"Starting Google Maps Scrape: {search_query}")
        
        await page.goto("https://www.google.com/maps", wait_until="networkidle")
        
        # Search input
        await page.fill("#searchboxinput", search_query)
        await page.keyboard.press("Enter")
        
        # Wait for results or "No results" message
        await page.wait_for_timeout(5000)
        
        # Scroll logic for the results sidebar
        # Selecting the scrollable div which usually has role="feed"
        scrollable_div = page.locator('div[role="feed"]')
        
        processed_count = 0
        leads_scraped = []
        
        while processed_count < limit:
            # Get current visible entries
            entries = page.locator('div[role="article"]')
            current_entries_count = await entries.count()
            
            if current_entries_count <= processed_count:
                # Try to scroll down to load more
                await scrollable_div.evaluate("el => el.scrollBy(0, 5000)")
                await page.wait_for_timeout(2000)
                # Check again
                if await entries.count() <= processed_count:
                    print("No more results found.")
                    break
            
            for i in range(processed_count, min(current_entries_count, limit)):
                try:
                    entry = entries.nth(i)
                    # Scroll into view to ensure data is loaded
                    await entry.scroll_into_view_if_needed()
                    
                    # Extract Data
                    name = await entry.get_attribute("aria-label") or "Unknown Business"
                    
                    # Click to load details if needed (optional, making it faster by just scraping the list first)
                    # For a robust scraper, we'd click each item. Here we'll try to scrape visible data.
                    
                    # Extract industry/category from sub-text
                    category = await entry.locator('.W4P9ed .fontBodyMedium').first.inner_text() if await entry.locator('.W4P9ed .fontBodyMedium').count() > 0 else industry
                    
                    # Simulated lead creation for the company
                    lead_data = {
                        "first_name": "General",
                        "last_name": "Inquiry",
                        "title": title or "Manager",
                        "scrap_source": "Google Maps"
                    }
                    
                    company_data = {
                        "name": name,
                        "industry": category,
                        "headquarters": location,
                        "size": employee_count or "Unknown"
                    }
                    
                    # Save to Database
                    try:
                        # Upsert company
                        comp_res = supabase.table("companies").upsert(company_data, on_conflict="name").execute()
                        if comp_res.data:
                            comp_id = comp_res.data[0]['id']
                            lead_data['company_id'] = comp_id
                            # Insert lead
                            supabase.table("leads").insert(lead_data).execute()
                            leads_scraped.append(name)
                    except Exception as db_err:
                        print(f"DB Error for {name}: {db_err}")
                        
                    processed_count += 1
                except Exception as e:
                    print(f"Error parsing entry {i}: {e}")
                    processed_count += 1
                    
        await browser.close()
        print(f"Successfully scraped and imported {len(leads_scraped)} businesses.")
        return leads_scraped

if __name__ == "__main__":
    asyncio.run(run_lead_scraper("SaaS Companies", "San Francisco", limit=5))
