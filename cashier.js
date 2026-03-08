// Laravel Cashier
const PACKAGES = [
  {
    id:'cashier', name:'Laravel Cashier', icon:'💳', theme:'theme-amber',
    subtitle:'laravel/cashier-stripe', category:'Billing',
    desc:'مكتبة لإدارة الاشتراكات والمدفوعات عبر Stripe — Subscriptions، Invoices، Webhooks.',
    tags:['Billing','Stripe','Subscriptions','Payments'],
    tutorial: {
      sections: [
        {
          title:'ما هو Laravel Cashier؟',
          content:`
            <p class="tut-p">Cashier بيوفر interface احترافي للتعامل مع Stripe — بيتكلف التفاصيل الصعبة زي الـ Subscriptions والـ Invoices والـ Webhooks.</p>
            <div class="feat-grid">
              <div class="feat-item"><div class="feat-emoji">🔄</div><div class="feat-t">Subscriptions</div><div class="feat-d">إنشاء وإدارة الاشتراكات الشهرية والسنوية</div></div>
              <div class="feat-item"><div class="feat-emoji">📄</div><div class="feat-t">Invoices</div><div class="feat-d">توليد الفواتير وتنزيلها PDF</div></div>
              <div class="feat-item"><div class="feat-emoji">🔔</div><div class="feat-t">Webhooks</div><div class="feat-d">معالجة أحداث Stripe تلقائياً</div></div>
              <div class="feat-item"><div class="feat-emoji">🆓</div><div class="feat-t">Free Trials</div><div class="feat-d">فترة تجريبية مجانية قابلة للتخصيص</div></div>
            </div>`
        },
        {
          title:'التثبيت والإعداد',
          content:`
            <div class="steps">
              <div class="step-item"><strong style='margin-right:3rem'>تثبيت Cashier</strong>
                <div class="code-wrap"><div class="code-top"><span class="code-lang">bash</span></div>
                <pre class="code">composer require laravel/cashier
php artisan vendor:publish --tag="cashier-migrations"
php artisan migrate</pre></div></div>
              <div class="step-item"><strong style='margin-right:3rem'>إضافة Billable Trait للـ User</strong>
                <div class="code-wrap"><div class="code-top"><span class="code-lang">php</span><span class="code-file">app/Models/User.php</span></div>
                <pre class="code"><span class="kw">use</span> <span class="cls">Laravel\\Cashier\\Billable</span>;

<span class="kw">class</span> <span class="cls">User</span> <span class="kw">extends</span> <span class="cls">Authenticatable</span>
{
    <span class="kw">use</span> Billable;
}</pre></div></div>
              <div class="step-item"><strong style='margin-right:3rem'>إعداد Stripe Keys في .env</strong>
                <div class="code-wrap"><div class="code-top"><span class="code-lang">env</span></div>
                <pre class="code">STRIPE_KEY=pk_test_xxx
STRIPE_SECRET=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
CASHIER_CURRENCY=usd
CASHIER_CURRENCY_LOCALE=en</pre></div></div>
            </div>`
        },
        {
          title:'إنشاء وإدارة الاشتراكات',
          content:`
            <div class="code-wrap"><div class="code-top"><span class="code-lang">php</span><span class="code-file">SubscriptionController.php</span></div>
            <pre class="code"><span class="cm">// إنشاء اشتراك جديد</span>
<span class="var">$user</span>-><span class="fn">newSubscription</span>(<span class="str">'default'</span>, <span class="str">'price_monthly_id'</span>)
     -><span class="fn">trialDays</span>(<span class="num">14</span>)        <span class="cm">// 14 يوم تجريبي مجاني</span>
     -><span class="fn">create</span>(<span class="var">$paymentMethod</span>);

<span class="cm">// التحقق من الاشتراك</span>
<span class="var">$user</span>-><span class="fn">subscribed</span>(<span class="str">'default'</span>);          <span class="cm">// هل مشترك؟</span>
<span class="var">$user</span>-><span class="fn">subscribedToPrice</span>(<span class="str">'price_id'</span>); <span class="cm">// هل في خطة معينة؟</span>
<span class="var">$user</span>-><span class="fn">onTrial</span>();                      <span class="cm">// هل في فترة تجريبية؟</span>

<span class="cm">// تغيير الخطة (Upgrade/Downgrade)</span>
<span class="var">$user</span>-><span class="fn">subscription</span>(<span class="str">'default'</span>)-><span class="fn">swap</span>(<span class="str">'price_premium_id'</span>);

<span class="cm">// إلغاء الاشتراك (بيظل شغال لنهاية الدورة)</span>
<span class="var">$user</span>-><span class="fn">subscription</span>(<span class="str">'default'</span>)-><span class="fn">cancel</span>();

<span class="cm">// استعادة الاشتراك الملغي</span>
<span class="var">$user</span>-><span class="fn">subscription</span>(<span class="str">'default'</span>)-><span class="fn">resume</span>();</pre></div>`
        },
        {
          title:'الدفع المرة الواحدة والفواتير',
          content:`
            <div class="code-wrap"><div class="code-top"><span class="code-lang">php</span></div>
            <pre class="code"><span class="cm">// دفع مرة واحدة</span>
<span class="var">$user</span>-><span class="fn">charge</span>(<span class="num">1000</span>, <span class="var">$paymentMethod</span>); <span class="cm">// بالسنت</span>

<span class="cm">// فاتورة بنود متعددة</span>
<span class="var">$user</span>-><span class="fn">invoiceFor</span>(<span class="str">'خدمة التصميم'</span>, <span class="num">5000</span>);

<span class="cm">// تنزيل الفاتورة PDF</span>
<span class="kw">return</span> <span class="var">$user</span>-><span class="fn">downloadInvoice</span>(<span class="var">$invoiceId</span>, [
    <span class="str">'vendor'</span>  => <span class="str">'شركتي'</span>,
    <span class="str">'product'</span> => <span class="str">'خطة الاشتراك الاحترافية'</span>,
]);

<span class="cm">// عرض كل الفواتير</span>
<span class="kw">foreach</span> (<span class="var">$user</span>-><span class="fn">invoices</span>() <span class="kw">as</span> <span class="var">$invoice</span>) {
    <span class="kw">echo</span> <span class="var">$invoice</span>->date()->toFormattedDateString();
    <span class="kw">echo</span> <span class="var">$invoice</span>->total();
}</pre></div>`
        },
        {
          title:'Webhooks',
          content:`
            <p class="tut-p">Cashier بيوفر Webhook Controller جاهز يستقبل أحداث Stripe تلقائياً.</p>
            <div class="code-wrap"><div class="code-top"><span class="code-lang">php</span><span class="code-file">routes/web.php</span></div>
            <pre class="code"><span class="cm">// مسار الـ Webhook</span>
<span class="cls">Route</span>::<span class="fn">post</span>(<span class="str">'/stripe/webhook'</span>, <span class="cls">\\Laravel\\Cashier\\Http\\Controllers\\WebhookController</span>::<span class="kw">class</span>);
<span class="cm">// لا تنسى تضيفه في CSRF exceptions</span></pre></div>
            <div class="code-wrap"><div class="code-top"><span class="code-lang">php</span><span class="code-file">AppServiceProvider.php</span></div>
            <pre class="code"><span class="cm">// الاستجابة لأحداث معينة</span>
<span class="cls">Cashier</span>::<span class="fn">handleWebhookUsing</span>(<span class="kw">function</span>(<span class="kw">string</span> <span class="var">$event</span>, <span class="kw">array</span> <span class="var">$payload</span>) {
    <span class="kw">if</span> (<span class="var">$event</span> === <span class="str">'customer.subscription.deleted'</span>) {
        <span class="cm">// الاشتراك اتلغى</span>
    }
});</pre></div>`
        }
      ]
    },
    qa: [
      { level:'easy', q:'ما هو Laravel Cashier وإيه الـ Payment Providers اللي بيدعمها؟', a:`<p>Cashier هو package لإدارة الاشتراكات والمدفوعات. يدعم:</p><ul><li><strong>Cashier (Stripe)</strong> — الأكثر شيوعاً</li><li><strong>Cashier (Paddle)</strong> — بديل لـ Stripe مع دعم المدفوعات العالمية</li></ul>` },
      { level:'easy', q:'إيه الـ Billable Trait وليه بنضيفه للـ User Model؟', a:`<p>الـ <code>Billable</code> Trait بيضيف كل methods الدفع للـ Model:</p><div class="code-wrap"><div class="code-top"><span class="code-lang">php</span></div><pre class="code"><span class="kw">use</span> <span class="cls">Laravel\\Cashier\\Billable</span>;

<span class="kw">class</span> <span class="cls">User</span> <span class="kw">extends</span> <span class="cls">Authenticatable</span>
{
    <span class="kw">use</span> Billable; <span class="cm">// ده اللي بيدي المستخدم قدرة الدفع</span>
}</pre></div><p>بعده تقدر تعمل: <code>$user->newSubscription()</code>، <code>$user->charge()</code>، <code>$user->invoices()</code></p>` },
      { level:'medium', q:'إزاي بتتعامل مع Subscription Status في المشروع؟', a:`<div class="code-wrap"><div class="code-top"><span class="code-lang">php</span></div><pre class="code"><span class="cm">// في Middleware</span>
<span class="kw">if</span> (!<span class="var">$user</span>-><span class="fn">subscribed</span>(<span class="str">'default'</span>)) {
    <span class="kw">return</span> <span class="fn">redirect</span>(<span class="str">'/billing'</span>);
}

<span class="cm">// في Blade</span>
@<span class="fn">if</span>(<span class="fn">auth</span>()-><span class="fn">user</span>()-><span class="fn">subscribed</span>(<span class="str">'default'</span>))
    <span class="str">// محتوى للمشتركين</span>
@<span class="fn">endif</span>

<span class="cm">// الحالات المختلفة</span>
<span class="var">$user</span>-><span class="fn">onTrial</span>();            <span class="cm">// في التجربة</span>
<span class="var">$user</span>-><span class="fn">onGracePeriod</span>();     <span class="cm">// الغى لكن لسه شغال</span>
<span class="var">$user</span>-><span class="fn">cancelled</span>();         <span class="cm">// ملغي نهائياً</span></pre></div>` },
      { level:'medium', q:'إزاي بتعمل Proration عند ترقية الخطة؟', a:`<p>الـ Proration معناها حساب الفرق في السعر بشكل عادل عند تغيير الخطة.</p><div class="code-wrap"><div class="code-top"><span class="code-lang">php</span></div><pre class="code"><span class="cm">// مع Proration (افتراضي)</span>
<span class="var">$user</span>-><span class="fn">subscription</span>(<span class="str">'default'</span>)-><span class="fn">swap</span>(<span class="str">'price_premium'</span>);

<span class="cm">// بدون Proration</span>
<span class="var">$user</span>-><span class="fn">subscription</span>(<span class="str">'default'</span>)
     -><span class="fn">noProrate</span>()
     -><span class="fn">swap</span>(<span class="str">'price_premium'</span>);

<span class="cm">// Swap في نهاية الدورة</span>
<span class="var">$user</span>-><span class="fn">subscription</span>(<span class="str">'default'</span>)
     -><span class="fn">swapAndInvoice</span>(<span class="str">'price_premium'</span>);</pre></div>` },
      { level:'hard', q:'إزاي بتتعامل مع Webhook Security في Cashier؟', a:`<p>Cashier بيتحقق من الـ Webhook Signature تلقائياً لو حددت <code>STRIPE_WEBHOOK_SECRET</code> في الـ .env. لو حبيت تعمل verification يدوي:</p><div class="code-wrap"><div class="code-top"><span class="code-lang">php</span></div><pre class="code"><span class="kw">use</span> <span class="cls">Stripe\\Webhook</span>;

<span class="kw">try</span> {
    <span class="var">$event</span> = <span class="cls">Webhook</span>::<span class="fn">constructEvent</span>(
        <span class="var">$payload</span>,
        <span class="var">$sigHeader</span>,
        <span class="fn">config</span>(<span class="str">'cashier.webhook_secret'</span>)
    );
} <span class="kw">catch</span> (<span class="cls">\\Exception</span> <span class="var">$e</span>) {
    <span class="kw">return</span> <span class="fn">response</span>(<span class="str">''</span>, <span class="num">400</span>);
}</pre></div>` },
      { level:'hard', q:'إزاي بتعمل Multiple Subscriptions لنفس المستخدم؟', a:`<div class="code-wrap"><div class="code-top"><span class="code-lang">php</span></div><pre class="code"><span class="cm">// مستخدم عنده اشتراكين مختلفين</span>
<span class="var">$user</span>-><span class="fn">newSubscription</span>(<span class="str">'main'</span>, <span class="str">'price_monthly'</span>)-><span class="fn">create</span>(<span class="var">$pm</span>);
<span class="var">$user</span>-><span class="fn">newSubscription</span>(<span class="str">'addon'</span>, <span class="str">'price_storage'</span>)-><span class="fn">create</span>(<span class="var">$pm</span>);

<span class="cm">// التحقق من كل منهم بشكل منفصل</span>
<span class="var">$user</span>-><span class="fn">subscribed</span>(<span class="str">'main'</span>);
<span class="var">$user</span>-><span class="fn">subscribed</span>(<span class="str">'addon'</span>);</pre></div>` },
    ]
  },

  // ==================== HORIZON ====================
];
