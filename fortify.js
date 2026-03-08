// Laravel Fortify
const PACKAGES = [
  {
    id:'fortify', name:'Laravel Fortify', icon:'🏰', theme:'theme-purple',
    subtitle:'laravel/fortify', category:'Authentication',
    desc:'Headless Authentication Backend — Authentication Logic بدون UI.',
    tags:['Auth','Headless','Backend','2FA'],
    tutorial: {
      sections: [
        { title:'ما هو Fortify؟', content:`<p class="tut-p">Fortify هو Authentication Backend بدون UI. بيوفر كل الـ Routes والـ Logic للـ Auth، وأنت بتبني الـ Views بنفسك. Breeze وـ Jetstream مبنيين فوقه.</p><div class="alert alert-info"><div class="alert-icon">💡</div><div>لو بتستخدم Breeze أو Jetstream، مش محتاج تثبت Fortify بنفسك — بيجي معاهم تلقائياً.</div></div>` },
        { title:'التثبيت والإعداد', content:`<div class="code-wrap"><div class="code-top"><span class="code-lang">bash</span></div><pre class="code">composer require laravel/fortify
php artisan vendor:publish --provider="Laravel\\Fortify\\FortifyServiceProvider"
php artisan migrate</pre></div><div class="code-wrap"><div class="code-top"><span class="code-lang">php</span><span class="code-file">app/Providers/FortifyServiceProvider.php</span></div><pre class="code"><span class="kw">public function</span> <span class="fn">boot</span>()
{
    <span class="cls">Fortify</span>::<span class="fn">createUsersUsing</span>(<span class="cls">CreateNewUser</span>::<span class="kw">class</span>);
    <span class="cls">Fortify</span>::<span class="fn">updateUserProfileInformationUsing</span>(<span class="cls">UpdateUserProfileInformation</span>::<span class="kw">class</span>);
    <span class="cls">Fortify</span>::<span class="fn">updateUserPasswordsUsing</span>(<span class="cls">UpdateUserPassword</span>::<span class="kw">class</span>);
    <span class="cls">Fortify</span>::<span class="fn">resetUserPasswordsUsing</span>(<span class="cls">ResetUserPassword</span>::<span class="kw">class</span>);

    <span class="cm">// تخصيص Views</span>
    <span class="cls">Fortify</span>::<span class="fn">loginView</span>(<span class="kw">fn</span>() => <span class="fn">view</span>(<span class="str">'auth.login'</span>));
    <span class="cls">Fortify</span>::<span class="fn">registerView</span>(<span class="kw">fn</span>() => <span class="fn">view</span>(<span class="str">'auth.register'</span>));
}</pre></div>` },
        { title:'Two-Factor Authentication (2FA)', content:`<div class="code-wrap"><div class="code-top"><span class="code-lang">php</span><span class="code-file">config/fortify.php</span></div><pre class="code"><span class="str">'features'</span> => [
    <span class="cls">Features</span>::<span class="fn">registration</span>(),
    <span class="cls">Features</span>::<span class="fn">resetPasswords</span>(),
    <span class="cls">Features</span>::<span class="fn">emailVerification</span>(),
    <span class="cls">Features</span>::<span class="fn">updateProfileInformation</span>(),
    <span class="cls">Features</span>::<span class="fn">updatePasswords</span>(),
    <span class="cls">Features</span>::<span class="fn">twoFactorAuthentication</span>([
        <span class="str">'confirm'</span>        => <span class="kw">true</span>,
        <span class="str">'confirmPassword'</span> => <span class="kw">true</span>,
    ]),
],</pre></div><div class="code-wrap"><div class="code-top"><span class="code-lang">php</span><span class="code-file">User.php</span></div><pre class="code"><span class="kw">use</span> <span class="cls">Laravel\\Fortify\\TwoFactorAuthenticatable</span>;

<span class="kw">class</span> <span class="cls">User</span> <span class="kw">extends</span> <span class="cls">Authenticatable</span>
{
    <span class="kw">use</span> TwoFactorAuthenticatable;
}</pre></div>` }
      ]
    },
    qa: [
      { level:'easy', q:'ما الفرق بين Fortify وـ Breeze؟', a:`<ul><li><strong>Fortify</strong> = Backend logic فقط (Routes + Actions) — بدون Views</li><li><strong>Breeze</strong> = Fortify + Views جاهزة بـ Tailwind</li></ul><p>لو حابب تبني الـ UI بنفسك بالكامل، استخدم Fortify. لو عايز تبدأ سريع، استخدم Breeze.</p>` },
      { level:'medium', q:'إزاي بتفعّل 2FA في Fortify؟', a:`<p>3 خطوات:</p><ol><li>فعّل <code>Features::twoFactorAuthentication()</code> في <code>config/fortify.php</code></li><li>ضيف <code>TwoFactorAuthenticatable</code> trait للـ User Model</li><li>وفّر Views لـ QR Code وـ Recovery Codes</li></ol>` },
      { level:'hard', q:'إزاي بتعمل Custom Authentication Logic في Fortify؟', a:`<div class="code-wrap"><div class="code-top"><span class="code-lang">php</span></div><pre class="code"><span class="cm">// تخصيص عملية الـ Login</span>
<span class="cls">Fortify</span>::<span class="fn">authenticateUsing</span>(<span class="kw">function</span>(<span class="cls">Request</span> <span class="var">$request</span>) {
    <span class="var">$user</span> = <span class="cls">User</span>::<span class="fn">where</span>(<span class="str">'email'</span>, <span class="var">$request</span>->email)->first();

    <span class="kw">if</span> (<span class="var">$user</span> && <span class="cls">Hash</span>::<span class="fn">check</span>(<span class="var">$request</span>->password, <span class="var">$user</span>->password)) {
        <span class="cm">// تحقق إضافي — مثلاً أن الحساب مفعّل</span>
        <span class="kw">if</span> (!<span class="var">$user</span>->is_active) <span class="kw">return</span> <span class="kw">null</span>;
        <span class="kw">return</span> <span class="var">$user</span>;
    }
});</pre></div>` },
    ]
  },

  // ==================== JETSTREAM ====================
];
