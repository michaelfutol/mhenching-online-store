package com.mhenching.online

import android.app.Activity
import android.graphics.Color
import android.graphics.Typeface
import android.graphics.drawable.GradientDrawable
import android.os.Bundle
import android.text.InputType
import android.view.Gravity
import android.view.View
import android.widget.Button
import android.widget.EditText
import android.widget.HorizontalScrollView
import android.widget.LinearLayout
import android.widget.ScrollView
import android.widget.TextView
import android.widget.Toast
import java.util.Locale

class MainActivity : Activity() {
    data class Product(
        val slug: String,
        val name: String,
        val price: Int,
        val descriptor: String,
        val why: String,
        val lane: String,
        val stockLabel: String
    )

    private val forest = Color.rgb(18, 60, 49)
    private val forestSoft = Color.rgb(37, 83, 69)
    private val cream = Color.rgb(247, 243, 234)
    private val paper = Color.WHITE
    private val gold = Color.rgb(185, 134, 42)
    private val muted = Color.rgb(100, 105, 99)
    private val danger = Color.rgb(155, 53, 53)

    private val products = listOf(
        Product("rechargeable-motion-light", "Rechargeable Motion Light", 169,
            "A soft automatic light for dark hallways, cabinets, and brownout nights.",
            "No rewiring. It wakes up when movement is detected.", "Mhenching Find", "Pilot catalog · verify stock before launch"),
        Product("mini-bag-sealer", "Mini Bag Sealer + Cutter", 149,
            "A tiny kitchen helper for resealing opened snack and pantry packs.",
            "Simple, demonstrable, inexpensive, and useful beyond Christmas.", "Mhenching Find", "Pilot catalog · source candidate"),
        Product("magnetic-cable-organizers", "Magnetic Cable Organizers", 79,
            "Tiny desk clips that keep charging cables from falling behind the table.",
            "A low-cost problem solver with an instant before-and-after demo.", "Mhenching Find", "Pilot catalog · source candidate"),
        Product("talaonga-buri-bayong", "Talaonga Buri Bayong", 349,
            "A handwoven everyday carry made close to home.",
            "Useful enough for the market, beautiful enough for gifting, and rooted in local craft.", "Gawang Magdalena", "Made-to-order concept · maker to verify"),
        Product("pili-caramel-bites", "Pili Caramel Bites", 129,
            "A small Sorsogon-style pasalubong pack built around pili.",
            "Easy to share, easy to gift, and a future bundle candidate.", "Gawang Magdalena", "Sample catalog item · supplier to verify"),
        Product("anahaw-christmas-star", "Anahaw Christmas Star", 99,
            "A quiet native-material Christmas accent for windows, gifts, and small trees.",
            "A seasonal piece that celebrates local material instead of generic plastic decor.", "Christmas World", "Concept · maker sourcing needed")
    )

    private val cart = linkedMapOf<String, Int>()
    private lateinit var content: LinearLayout
    private lateinit var cartBadge: TextView
    private var currentTab = "home"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        loadCart()
        renderShell()
        showHome()
    }

    private fun renderShell() {
        val root = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            setBackgroundColor(cream)
        }
        root.addView(header())

        val scroll = ScrollView(this).apply { isFillViewport = true }
        content = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            setPadding(dp(18), dp(16), dp(18), dp(28))
        }
        scroll.addView(content)
        root.addView(scroll, LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, 0, 1f))
        root.addView(bottomNav())
        setContentView(root)
    }

    private fun header(): View {
        val bar = LinearLayout(this).apply {
            orientation = LinearLayout.HORIZONTAL
            gravity = Gravity.CENTER_VERTICAL
            setPadding(dp(18), dp(14), dp(14), dp(14))
            setBackgroundColor(forest)
        }
        val title = LinearLayout(this).apply { orientation = LinearLayout.VERTICAL }
        title.addView(text("MHENCHING", 20f, Color.WHITE, true))
        title.addView(text("Online Store · Sta. Magdalena", 11f, Color.rgb(218, 231, 223)))
        bar.addView(title, LinearLayout.LayoutParams(0, LinearLayout.LayoutParams.WRAP_CONTENT, 1f))
        cartBadge = text(cartLabel(), 13f, forest, true).apply {
            setPadding(dp(12), dp(8), dp(12), dp(8))
            background = rounded(gold, 18f)
            setOnClickListener { select("cart") }
        }
        bar.addView(cartBadge)
        return bar
    }

    private fun bottomNav(): View {
        val navScroll = HorizontalScrollView(this).apply {
            isHorizontalScrollBarEnabled = false
            setBackgroundColor(paper)
        }
        val nav = LinearLayout(this).apply {
            orientation = LinearLayout.HORIZONTAL
            gravity = Gravity.CENTER
            setPadding(dp(6), dp(7), dp(6), dp(9))
        }
        listOf(
            "home" to "Home",
            "browse" to "Browse",
            "christmas" to "Christmas",
            "cart" to "Cart",
            "chat" to "Ask Mhenching",
            "admin" to "Admin"
        ).forEach { (id, label) ->
            val b = Button(this).apply {
                text = label
                textSize = 12f
                isAllCaps = false
                setTextColor(forest)
                background = rounded(Color.TRANSPARENT, 14f)
                setOnClickListener { select(id) }
            }
            nav.addView(b, LinearLayout.LayoutParams(dp(if (id == "chat") 120 else 94), dp(48)))
        }
        navScroll.addView(nav)
        return navScroll
    }

    private fun select(tab: String) {
        currentTab = tab
        when (tab) {
            "browse" -> showBrowse()
            "christmas" -> showChristmas()
            "cart" -> showCart()
            "chat" -> showChat()
            "admin" -> showAdmin()
            else -> showHome()
        }
    }

    private fun reset() { content.removeAllViews() }

    private fun showHome() {
        reset()
        hero("Mhenching, closer to home.", "Curated useful finds, local products, Christmas pieces, and future same-town delivery.")
        pilotNotice()
        sectionTitle("Small catalog. Better curation.")
        paragraph("We are intentionally starting with a few products that have a clear use, story, or demo. Real stock, photos, and supplier details will replace pilot data before public launch.")
        products.take(3).forEach { productCard(it) }
        sectionTitle("Gawang Magdalena")
        paragraph("Native craft and pili products get their own lane, with maker story and fair economics—not a race to the cheapest price.")
        products.filter { it.lane == "Gawang Magdalena" }.take(2).forEach { productCard(it) }
    }

    private fun showBrowse() {
        reset()
        pageTitle("Browse")
        paragraph("Pilot catalog for internal testing. Nothing here should be treated as verified on-hand stock yet.")
        products.forEach { productCard(it) }
    }

    private fun showChristmas() {
        reset()
        val card = cardContainer(forest)
        val lights = LinearLayout(this).apply { orientation = LinearLayout.HORIZONTAL; gravity = Gravity.CENTER }
        listOf(Color.RED, Color.rgb(50,145,82), Color.rgb(75,115,210), gold, Color.rgb(245,245,220)).forEach { c ->
            lights.addView(View(this).apply { background = rounded(c, 99f) }, LinearLayout.LayoutParams(dp(12), dp(12)).apply { setMargins(dp(8), dp(4), dp(8), dp(8)) })
        }
        card.addView(lights)
        card.addView(text("Mhenching Christmas World", 25f, Color.WHITE, true))
        card.addView(text("Quiet magical Christmas · tiny lights · curated gifts · local craft", 14f, Color.rgb(225, 237, 229)).apply { setPadding(0, dp(8), 0, dp(4)) })
        content.addView(card)
        sectionTitle("Christmas test lane")
        products.filter { it.lane == "Christmas World" }.forEach { productCard(it) }
        paragraph("The full web experience will keep the subtle snowfall and multicolored lights. This native APK v0.1 keeps animation minimal while we prove install, navigation, cart, and admin flow first.")
    }

    private fun showCart() {
        reset()
        pageTitle("Your cart")
        if (cart.isEmpty()) {
            paragraph("Your cart is empty. Add a few pilot products from Browse.")
            action("Browse products", forest) { select("browse") }
            return
        }
        var total = 0
        cart.forEach { (slug, qty) ->
            val p = products.firstOrNull { it.slug == slug } ?: return@forEach
            total += p.price * qty
            val c = cardContainer(paper)
            c.addView(text(p.name, 17f, forest, true))
            c.addView(text("${peso(p.price)} × $qty = ${peso(p.price * qty)}", 14f, muted))
            val row = LinearLayout(this).apply { orientation = LinearLayout.HORIZONTAL; setPadding(0, dp(8), 0, 0) }
            row.addView(smallButton("−") { changeQty(slug, -1) })
            row.addView(smallButton("+") { changeQty(slug, 1) })
            row.addView(smallButton("Remove") { cart.remove(slug); saveCart(); updateBadge(); showCart() })
            c.addView(row)
            content.addView(c)
        }
        val totalCard = cardContainer(forest)
        totalCard.addView(text("Pilot total", 13f, Color.rgb(214,226,220)))
        totalCard.addView(text(peso(total), 28f, Color.WHITE, true))
        content.addView(totalCard)
        sectionTitle("Checkout choices")
        paragraph("For the MVP: COD inside supported Magdalena delivery zones, Cash on Pickup, and manual GCash / QR with human verification.")
        action("COD · Magdalena Poblacion", gold) { toast("COD selected · pilot mode only") }
        action("Manual GCash / QR", forestSoft) { toast("Manual payment selected · verification required") }
        action("Cash on Pickup", forestSoft) { toast("Pickup selected · pilot mode only") }
        warning("Real order submission is still locked until the dedicated Mhenching Online database and inventory reservation are connected.")
    }

    private fun showChat() {
        reset()
        pageTitle("Ask Mhenching")
        paragraph("Resident Attendant v0.1 answers safe store questions locally. It will never claim a payment is verified or invent live stock/order status.")
        val response = text("Try: ‘May COD?’, ‘gift under 200’, ‘pili’, or ‘Christmas’.", 14f, forest).apply {
            setPadding(dp(14), dp(14), dp(14), dp(14)); background = rounded(Color.rgb(229,238,232), 16f)
        }
        content.addView(response, paramsMargin())
        val input = EditText(this).apply {
            hint = "Ask about products, COD, GCash, gifts…"
            textSize = 15f
            setPadding(dp(14), dp(12), dp(14), dp(12))
            background = rounded(Color.WHITE, 16f, Color.rgb(215,215,208))
        }
        content.addView(input, paramsMargin())
        action("Send", forest) {
            val q = input.text.toString().trim()
            response.text = if (q.isBlank()) "Type a question first." else attendant(q)
        }
        warning("Refunds, complaints, payment mismatches, special discounts, and payment verification must be handed to Michael/Chingmen.")
    }

    private fun showAdmin() {
        reset()
        pageTitle("Private Admin Cockpit")
        warning("Internal test build only. Public customers must never see supplier cost, Radar, margins, payment verification, or Lum Admin controls.")
        sectionTitle("Today")
        metricRow("Orders", "—", "Needs live DB")
        metricRow("Payments waiting", "—", "Needs live DB")
        metricRow("Low stock", "—", "Needs POS bridge")
        metricRow("Radar candidates", "6", "China-direct Wave 1 seeded")
        sectionTitle("Quick Add · preview")
        val name = edit("Product name")
        val price = edit("Selling price", true)
        val qty = edit("Preliminary qty", true)
        content.addView(name, paramsMargin())
        content.addView(price, paramsMargin())
        content.addView(qty, paramsMargin())
        action("Preview item", forest) {
            val n = name.text.toString().ifBlank { "Untitled item" }
            toast("$n prepared as draft only · Save/Publish waits for Supabase")
        }
        sectionTitle("Lum Admin")
        paragraph("Planned command center: ask for best sellers, low-margin products, reorder recommendations, pending payments, campaign performance, and new sourcing finds. MCP/service tools remain deliberately unconnected in this APK pilot.")
    }

    private fun productCard(p: Product) {
        val c = cardContainer(paper)
        c.addView(text(p.lane.uppercase(Locale.getDefault()), 11f, gold, true))
        c.addView(text(p.name, 19f, forest, true).apply { setPadding(0, dp(4), 0, dp(2)) })
        c.addView(text(peso(p.price), 20f, forest, true))
        c.addView(text(p.descriptor, 14f, Color.DKGRAY).apply { setPadding(0, dp(8), 0, dp(4)) })
        c.addView(text("Why it matters: ${p.why}", 13f, muted))
        c.addView(text(p.stockLabel, 12f, danger, true).apply { setPadding(0, dp(8), 0, dp(8)) })
        c.addView(Button(this).apply {
            text = "Add to test cart"
            isAllCaps = false
            setTextColor(Color.WHITE)
            background = rounded(forest, 14f)
            setOnClickListener { addToCart(p.slug) }
        })
        content.addView(c, paramsMargin())
    }

    private fun hero(title: String, body: String) {
        val c = cardContainer(forest)
        c.addView(text("M H E N C H I N G", 11f, gold, true))
        c.addView(text(title, 28f, Color.WHITE, true).apply { setPadding(0, dp(8), 0, dp(8)) })
        c.addView(text(body, 15f, Color.rgb(225, 235, 229)))
        content.addView(c)
    }

    private fun pilotNotice() {
        val t = text("APK v0.1 · INTERNAL PILOT\nCatalog and stock are preliminary. Real orders are disabled.", 12f, forest, true).apply {
            setPadding(dp(14), dp(12), dp(14), dp(12)); background = rounded(Color.rgb(244,224,173), 14f)
        }
        content.addView(t, paramsMargin())
    }

    private fun pageTitle(s: String) = content.addView(text(s, 28f, forest, true).apply { setPadding(0, 0, 0, dp(8)) })
    private fun sectionTitle(s: String) = content.addView(text(s, 20f, forest, true).apply { setPadding(0, dp(18), 0, dp(8)) })
    private fun paragraph(s: String) = content.addView(text(s, 14f, Color.DKGRAY).apply { setLineSpacing(0f, 1.15f) })
    private fun warning(s: String) = content.addView(text(s, 12f, danger, true).apply { setPadding(dp(12), dp(12), dp(12), dp(12)); background = rounded(Color.rgb(252,235,231), 12f) }, paramsMargin())

    private fun metricRow(label: String, value: String, note: String) {
        val c = cardContainer(paper)
        val row = LinearLayout(this).apply { orientation = LinearLayout.HORIZONTAL; gravity = Gravity.CENTER_VERTICAL }
        val left = LinearLayout(this).apply { orientation = LinearLayout.VERTICAL }
        left.addView(text(label, 14f, forest, true)); left.addView(text(note, 11f, muted))
        row.addView(left, LinearLayout.LayoutParams(0, LinearLayout.LayoutParams.WRAP_CONTENT, 1f))
        row.addView(text(value, 22f, forest, true))
        c.addView(row)
        content.addView(c, paramsMargin(dp(8)))
    }

    private fun action(label: String, color: Int, onClick: () -> Unit) {
        val b = Button(this).apply {
            text = label; isAllCaps = false; textSize = 14f; setTextColor(Color.WHITE)
            background = rounded(color, 14f); setOnClickListener { onClick() }
        }
        content.addView(b, paramsMargin(dp(8)))
    }

    private fun smallButton(label: String, onClick: () -> Unit): Button = Button(this).apply {
        text = label; isAllCaps = false; textSize = 12f; minWidth = 0; setPadding(dp(10), 0, dp(10), 0)
        setTextColor(forest); background = rounded(Color.rgb(235,239,235), 12f); setOnClickListener { onClick() }
    }

    private fun edit(hintText: String, numeric: Boolean = false): EditText = EditText(this).apply {
        hint = hintText; textSize = 14f; setPadding(dp(14), dp(12), dp(14), dp(12)); background = rounded(Color.WHITE, 14f, Color.rgb(215,215,208))
        if (numeric) inputType = InputType.TYPE_CLASS_NUMBER or InputType.TYPE_NUMBER_FLAG_DECIMAL
    }

    private fun attendant(query: String): String {
        val q = query.lowercase(Locale.getDefault())
        return when {
            "cod" in q || "deliver" in q -> "COD is planned first for supported Magdalena Poblacion delivery zones. Exact live delivery coverage will come from admin settings once the order backend is connected."
            "gcash" in q || "qr" in q -> "Manual GCash / QR is part of the MVP. Payment remains ‘waiting for verification’ until Michael or Chingmen confirms the actual incoming transaction."
            "pili" in q -> "We are building a Gawang Magdalena lane for pili foods, pili oil, and future gift/export-ready bundles. Current APK items are pilot catalog entries only."
            "christmas" in q || "gift" in q -> "Christmas World will combine curated low-cost finds with Gawang Magdalena gifts. For under ₱200, try the mini bag sealer, motion light, pili bites, or native Christmas accents once verified."
            "stock" in q || "available" in q -> "I cannot claim live stock yet. The dedicated online database and physical POS inventory bridge are not connected in this pilot build."
            "refund" in q || "complaint" in q || "charged" in q -> "I need to hand that to Mhenching support. Sensitive payment, complaint, or refund cases require human review."
            else -> "I can help with products, gift ideas, COD, manual GCash/QR, pickup, Christmas, and Gawang Magdalena. Live order and stock answers will unlock only when trusted store tools are connected."
        }
    }

    private fun addToCart(slug: String) {
        cart[slug] = (cart[slug] ?: 0) + 1
        saveCart(); updateBadge(); toast("Added to test cart")
    }

    private fun changeQty(slug: String, delta: Int) {
        val next = (cart[slug] ?: 0) + delta
        if (next <= 0) cart.remove(slug) else cart[slug] = next
        saveCart(); updateBadge(); showCart()
    }

    private fun cartLabel(): String = "Cart ${cart.values.sum()}"
    private fun updateBadge() { if (::cartBadge.isInitialized) cartBadge.text = cartLabel() }
    private fun saveCart() {
        val encoded = cart.entries.joinToString(";") { "${it.key}:${it.value}" }
        getSharedPreferences("mhenching", MODE_PRIVATE).edit().putString("cart", encoded).apply()
    }
    private fun loadCart() {
        val encoded = getSharedPreferences("mhenching", MODE_PRIVATE).getString("cart", "") ?: ""
        encoded.split(";").filter { it.contains(":") }.forEach {
            val parts = it.split(":"); val qty = parts.getOrNull(1)?.toIntOrNull() ?: 0
            if (qty > 0) cart[parts[0]] = qty
        }
    }

    private fun peso(v: Int) = "₱%,d".format(Locale.US, v)
    private fun toast(s: String) = Toast.makeText(this, s, Toast.LENGTH_SHORT).show()
    private fun dp(v: Int): Int = (v * resources.displayMetrics.density).toInt()

    private fun text(value: String, size: Float, color: Int, bold: Boolean = false) = TextView(this).apply {
        text = value; textSize = size; setTextColor(color)
        if (bold) setTypeface(typeface, Typeface.BOLD)
    }

    private fun cardContainer(color: Int): LinearLayout = LinearLayout(this).apply {
        orientation = LinearLayout.VERTICAL
        setPadding(dp(16), dp(16), dp(16), dp(16))
        background = rounded(color, 18f)
    }

    private fun rounded(fill: Int, radiusDp: Float, stroke: Int? = null): GradientDrawable = GradientDrawable().apply {
        shape = GradientDrawable.RECTANGLE
        setColor(fill)
        cornerRadius = dp(radiusDp.toInt()).toFloat()
        if (stroke != null) setStroke(dp(1), stroke)
    }

    private fun paramsMargin(bottom: Int = dp(12)) = LinearLayout.LayoutParams(
        LinearLayout.LayoutParams.MATCH_PARENT,
        LinearLayout.LayoutParams.WRAP_CONTENT
    ).apply { setMargins(0, dp(8), 0, bottom) }
}
