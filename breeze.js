// Laravel Breeze
const PACKAGES = [
  {
    id:'breeze', name:'Laravel Breeze', icon:'🌬️', theme:'theme-blue',
    subtitle:'laravel/breeze', category:'Starter Kits',
    desc:'Starter Kit بسيط للـ Authentication — Login، Register، Password Reset بـ Tailwind.',
    tags:['Auth','Starter','Tailwind','Scaffolding'],
    tutorial: {
      sections: [
        { title:'ما هو Breeze؟', content:`<p class="tut-p">Breeze هو أبسط Starter Kit من Laravel. بيوفر scaffolding لـ Authentication كاملة مع واجهة Tailwind نظيفة.</p><div class="feat-grid"><div class="feat-item"><div class="feat-emoji">🔐</div><div class="feat-t">Authentication</div><div class="feat-d">Login، Register، Reset Password، Email Verify</div></div><div class="feat-item"><div class="feat-emoji">🎨</div><div class="feat-t">Multi Stack</div><div class="feat-d">Blade، Livewire، Vue، React</div></div><div class="feat-item"><div class="feat-emoji">📋</div><div class="feat-t">Profile Page</div><div class="feat-d">تحديث الاسم والإيميل وكلمة المرور</div></div><div class="feat-item"><div class="feat-emoji">🧪</div><div class="feat-t">Tests جاهزة</div><div class="feat-d">Feature Tests للـ Auth كلها</div></div></div>` },
        { title:'التثبيت', content:`<div class="code-wrap"><div class="code-top"><span class="code-lang">bash</span></div><pre class="code"><span class="cm"># في مشروع جديد</span>
laravel new myapp
<span class="cm"># اختار Breeze عند السؤال</span>

<span class="cm"># أو يدوياً</span>
composer require laravel/breeze --dev
php artisan breeze:install

<span class="cm"># اختار الـ Stack</span>
<span class="cm"># blade / livewire / vue / react / api</span>

npm install && npm run dev
php artisan migrate</pre></div>` },
        { title:'الـ Stacks المتاحة', content:`<div class="compare-table"><table class="compare-table"><tr><th>Stack</th><th>الوصف</th></tr><tr><td><code>blade</code></td><td>Blade + Tailwind (الافتراضي)</td></tr><tr><td><code>livewire</code></td><td>Livewire + Volt</td></tr><tr><td><code>vue</code></td><td>Inertia + Vue 3</td></tr><tr><td><code>react</code></td><td>Inertia + React</td></tr><tr><td><code>api</code></td><td>Backend API فقط (بدون Views)</td></tr></table></div>` }
      ]
    },
    qa: [
      { level:'easy', q:'ما الفرق بين Breeze وـ Jetstream؟', a:`<table class="compare-table"><tr><th>Breeze</th><th>Jetstream</th></tr><tr><td>بسيط جداً</td><td>متقدم أكثر</td></tr><tr><td>للمبتدئين</td><td>للمشاريع الكبيرة</td></tr><tr><td>Blade أو Inertia</td><td>Livewire أو Inertia</td></tr><tr><td>Auth أساسية</td><td>Auth + Teams + 2FA + API</td></tr></table>` },
      { level:'medium', q:'إزاي بتستخدم Breeze مع API (Next.js أو Nuxt.js)؟', a:`<div class="code-wrap"><div class="code-top"><span class="code-lang">bash</span></div><pre class="code">php artisan breeze:install api</pre></div><p>هيثبت Sanctum تلقائياً ويوفر <code>/register</code>، <code>/login</code>، <code>/logout</code> كـ API endpoints جاهزة. بعدين تربطها بـ Next.js مثلاً.</p>` },
      { level:'medium', q:'بعد ما تثبت Breeze، إزاي بتضيف Authorization للـ Routes؟', a:`<div class="code-wrap"><div class="code-top"><span class="code-lang">php</span></div><pre class="code"><span class="cm">// الـ Routes محمية تلقائياً بـ auth middleware</span>
<span class="cls">Route</span>::<span class="fn">middleware</span>(<span class="str">'auth'</span>)-><span class="fn">group</span>(<span class="kw">function</span>() {
    <span class="cls">Route</span>::<span class="fn">get</span>(<span class="str">'/dashboard'</span>, <span class="kw">fn</span>() => <span class="fn">view</span>(<span class="str">'dashboard'</span>))->name(<span class="str">'dashboard'</span>);
});

<span class="cm">// في Blade</span>
@<span class="fn">auth</span>  ...  @<span class="fn">endauth</span>
@<span class="fn">guest</span> ...  @<span class="fn">endguest</span></pre></div>` },
    ]
  },

  // ==================== FORTIFY ====================
];
