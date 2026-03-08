// Laravel Jetstream
const PACKAGES = [
  {
    id:'jetstream', name:'Laravel Jetstream', icon:'🚀', theme:'theme-blue',
    subtitle:'laravel/jetstream', category:'Starter Kits',
    desc:'Starter Kit متقدم — Teams، 2FA، API Tokens، Profile Photo، Sessions.',
    tags:['Starter','Auth','Teams','2FA'],
    tutorial: {
      sections: [
        { title:'ما هو Jetstream؟', content:`<p class="tut-p">Jetstream هو Starter Kit متقدم بيوفر كل Features الـ Authentication المتقدمة. مبني فوق Fortify وـ Sanctum.</p><div class="feat-grid"><div class="feat-item"><div class="feat-emoji">👥</div><div class="feat-t">Teams</div><div class="feat-d">إدارة الفرق والصلاحيات</div></div><div class="feat-item"><div class="feat-emoji">🔐</div><div class="feat-t">Two-Factor Auth</div><div class="feat-d">TOTP بـ Google Authenticator</div></div><div class="feat-item"><div class="feat-emoji">📱</div><div class="feat-t">API Tokens</div><div class="feat-d">Sanctum tokens لكل مستخدم</div></div><div class="feat-item"><div class="feat-emoji">🖼️</div><div class="feat-t">Profile Photos</div><div class="feat-d">رفع وتغيير الصورة الشخصية</div></div></div>` },
        { title:'التثبيت', content:`<div class="code-wrap"><div class="code-top"><span class="code-lang">bash</span></div><pre class="code">composer require laravel/jetstream
<span class="cm"># مع Livewire</span>
php artisan jetstream:install livewire --teams

<span class="cm"># مع Inertia</span>
php artisan jetstream:install inertia --teams

npm install && npm run dev
php artisan migrate</pre></div>` },
        { title:'Teams Management', content:`<div class="code-wrap"><div class="code-top"><span class="code-lang">php</span></div><pre class="code"><span class="cm">// إنشاء Team</span>
<span class="var">$user</span>-><span class="fn">ownedTeams</span>()->create([<span class="str">'name'</span> => <span class="str">'فريقي'</span>]);

<span class="cm">// إضافة عضو</span>
<span class="var">$team</span>-><span class="fn">addTeamMember</span>(<span class="var">$user</span>, <span class="str">'editor'</span>);

<span class="cm">// التحقق من الصلاحية</span>
<span class="var">$user</span>-><span class="fn">hasTeamRole</span>(<span class="var">$team</span>, <span class="str">'editor'</span>);

<span class="cm">// الـ Team الحالي</span>
<span class="var">$user</span>->currentTeam;
<span class="var">$user</span>->currentTeam->allUsers();</pre></div>` }
      ]
    },
    qa: [
      { level:'easy', q:'ما الفرق بين Jetstream بـ Livewire وـ Jetstream بـ Inertia؟', a:`<table class="compare-table"><tr><th>Livewire Stack</th><th>Inertia Stack</th></tr><tr><td>Blade + Livewire</td><td>Vue 3 / React</td></tr><tr><td>Server-driven UI</td><td>Client-side UI</td></tr><tr><td>بسيط للـ Laravel Devs</td><td>مناسب للـ JS Devs</td></tr><tr><td>SEO سهل</td><td>SEO يحتاج SSR</td></tr></table>` },
      { level:'medium', q:'إزاي بتعرّف Custom Team Roles في Jetstream؟', a:`<div class="code-wrap"><div class="code-top"><span class="code-lang">php</span><span class="code-file">JetstreamServiceProvider.php</span></div><pre class="code"><span class="cls">Jetstream</span>::<span class="fn">role</span>(<span class="str">'editor'</span>, <span class="str">'محرر'</span>, [
    <span class="str">'read'</span>,
    <span class="str">'create'</span>,
    <span class="str">'update'</span>,
])-><span class="fn">description</span>(<span class="str">'يستطيع إضافة وتعديل المحتوى'</span>);

<span class="cls">Jetstream</span>::<span class="fn">role</span>(<span class="str">'viewer'</span>, <span class="str">'مشاهد'</span>, [
    <span class="str">'read'</span>,
])-><span class="fn">description</span>(<span class="str">'مشاهدة فقط'</span>);</pre></div>` },
      { level:'hard', q:'إزاي بتتعامل مع Team-based Authorization في الـ Policies؟', a:`<div class="code-wrap"><div class="code-top"><span class="code-lang">php</span></div><pre class="code"><span class="kw">class</span> <span class="cls">PostPolicy</span>
{
    <span class="kw">public function</span> <span class="fn">update</span>(<span class="cls">User</span> <span class="var">$user</span>, <span class="cls">Post</span> <span class="var">$post</span>): <span class="kw">bool</span>
    {
        <span class="cm">// التحقق من Role في الـ Team الحالي</span>
        <span class="kw">return</span> <span class="var">$user</span>-><span class="fn">hasTeamPermission</span>(
            <span class="var">$user</span>->currentTeam,
            <span class="str">'update'</span>
        );
    }
}</pre></div>` },
    ]
  },

  // ==================== VALET ====================
];
