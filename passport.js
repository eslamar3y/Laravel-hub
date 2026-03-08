// Laravel Passport
const PACKAGES = [
  {
    id:'passport', name:'Laravel Passport', icon:'🛂', theme:'theme-amber',
    subtitle:'laravel/passport', category:'Authentication',
    desc:'OAuth2 Server كامل — Authorization Code، Client Credentials، Password Grant.',
    tags:['OAuth2','Auth','API','Tokens'],
    tutorial: {
      sections: [
        { title:'ما هو Passport؟', content:`<p class="tut-p">Passport بيوفر OAuth2 server كامل لتطبيق Laravel. مناسب لو بتحتاج third-party apps تدخل على API بتاعتك.</p><div class="alert alert-info"><div class="alert-icon">💡</div><div>لو مش محتاج OAuth2 كامل، استخدم Sanctum — أبسط وأسرع.</div></div>` },
        { title:'التثبيت', content:`<div class="code-wrap"><div class="code-top"><span class="code-lang">bash</span></div><pre class="code">php artisan install:api --passport
<span class="cm"># أو يدوياً:</span>
composer require laravel/passport
php artisan migrate
php artisan passport:install</pre></div>` },
        { title:'Authorization Code Grant', content:`<div class="code-wrap"><div class="code-top"><span class="code-lang">php</span></div><pre class="code"><span class="cm">// 1. User بيطلب Authorization</span>
GET /oauth/authorize?client_id=1&redirect_uri=...&response_type=code

<span class="cm">// 2. Exchange code for token</span>
POST /oauth/token
{
    grant_type:    authorization_code,
    client_id:     1,
    client_secret: secret,
    redirect_uri:  ...,
    code:          received_code
}

<span class="cm">// 3. استخدام الـ Token</span>
Authorization: Bearer {access_token}</pre></div>` },
        { title:'Personal Access Tokens', content:`<div class="code-wrap"><div class="code-top"><span class="code-lang">php</span></div><pre class="code"><span class="cm">// إصدار Token شخصي</span>
<span class="var">$token</span> = <span class="var">$user</span>-><span class="fn">createToken</span>(<span class="str">'Token Name'</span>, [<span class="str">'server:read'</span>]);
<span class="kw">echo</span> <span class="var">$token</span>->accessToken;

<span class="cm">// تحقق من الـ Scopes</span>
<span class="var">$request</span>-><span class="fn">user</span>()-><span class="fn">tokenCan</span>(<span class="str">'server:read'</span>);

<span class="cm">// Scope Middleware</span>
<span class="cls">Route</span>::<span class="fn">middleware</span>([<span class="str">'auth:api'</span>, <span class="str">'scope:read-servers'</span>])->...</pre></div>` }
      ]
    },
    qa: [
      { level:'easy', q:'ما الفرق بين Passport وـ Sanctum؟', a:`<table class="compare-table"><tr><th>Passport</th><th>Sanctum</th></tr><tr><td>OAuth2 كامل</td><td>Tokens بسيطة</td></tr><tr><td>مناسب للـ Third-party</td><td>مناسب لـ First-party</td></tr><tr><td>تثبيت أصعب</td><td>تثبيت سهل</td></tr><tr><td>Refresh Tokens</td><td>لا يوجد</td></tr></table>` },
      { level:'medium', q:'اشرح OAuth2 Grants المختلفة في Passport', a:`<ul><li><strong>Authorization Code</strong> — للـ web apps — أكثر أماناً</li><li><strong>Client Credentials</strong> — بين Servers بدون user</li><li><strong>Password Grant</strong> — trusted clients (mobile)</li><li><strong>Device Code</strong> — للأجهزة بدون browser</li><li><strong>Personal Access</strong> — tokens شخصية للمستخدمين</li></ul>` },
      { level:'hard', q:'إزاي بتعمل Refresh Token Rotation في Passport؟', a:`<div class="code-wrap"><div class="code-top"><span class="code-lang">php</span></div><pre class="code"><span class="cm">// في AppServiceProvider</span>
<span class="cls">Passport</span>::<span class="fn">tokensExpireIn</span>(<span class="fn">now</span>()-><span class="fn">addDays</span>(<span class="num">15</span>));
<span class="cls">Passport</span>::<span class="fn">refreshTokensExpireIn</span>(<span class="fn">now</span>()-><span class="fn">addDays</span>(<span class="num">30</span>));
<span class="cls">Passport</span>::<span class="fn">personalAccessTokensExpireIn</span>(<span class="fn">now</span>()-><span class="fn">addMonths</span>(<span class="num">6</span>));</pre></div>` },
    ]
  },

  // ==================== FILAMENT ====================
];
