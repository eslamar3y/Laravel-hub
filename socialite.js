// Laravel Socialite
const PACKAGES = [
  {
    id:'socialite', name:'Laravel Socialite', icon:'🌐', theme:'theme-blue',
    subtitle:'laravel/socialite', category:'Authentication',
    desc:'Social Login بـ OAuth — Google، Facebook، GitHub، Twitter والمزيد.',
    tags:['OAuth','Social','Auth','Login'],
    tutorial: {
      sections: [
        { title:'ما هو Socialite؟', content:`<p class="tut-p">Socialite بيوفر واجهة بسيطة لـ OAuth authentication مع مزودين زي Google وـ GitHub وـ Facebook.</p>` },
        { title:'الإعداد', content:`<div class="code-wrap"><div class="code-top"><span class="code-lang">bash</span></div><pre class="code">composer require laravel/socialite</pre></div><div class="code-wrap"><div class="code-top"><span class="code-lang">env</span></div><pre class="code">GITHUB_CLIENT_ID=xxx
GITHUB_CLIENT_SECRET=xxx
GITHUB_REDIRECT=https://yourapp.com/auth/github/callback

GOOGLE_CLIENT_ID=xxx
GOOGLE_CLIENT_SECRET=xxx
GOOGLE_REDIRECT=https://yourapp.com/auth/google/callback</pre></div>` },
        { title:'الاستخدام', content:`<div class="code-wrap"><div class="code-top"><span class="code-lang">php</span><span class="code-file">SocialAuthController.php</span></div><pre class="code"><span class="kw">use</span> <span class="cls">Laravel\\Socialite\\Facades\\Socialite</span>;

<span class="cm">// توجيه للـ Provider</span>
<span class="kw">public function</span> <span class="fn">redirect</span>()
{
    <span class="kw">return</span> <span class="cls">Socialite</span>::<span class="fn">driver</span>(<span class="str">'google'</span>)-><span class="fn">redirect</span>();
}

<span class="cm">// معالجة الـ Callback</span>
<span class="kw">public function</span> <span class="fn">callback</span>()
{
    <span class="var">$socialUser</span> = <span class="cls">Socialite</span>::<span class="fn">driver</span>(<span class="str">'google'</span>)-><span class="fn">user</span>();

    <span class="var">$user</span> = <span class="cls">User</span>::<span class="fn">updateOrCreate</span>(
        [<span class="str">'google_id'</span> => <span class="var">$socialUser</span>->id],
        [
            <span class="str">'name'</span>       => <span class="var">$socialUser</span>->name,
            <span class="str">'email'</span>      => <span class="var">$socialUser</span>->email,
            <span class="str">'avatar'</span>     => <span class="var">$socialUser</span>->avatar,
            <span class="str">'google_id'</span>  => <span class="var">$socialUser</span>->id,
        ]
    );

    <span class="fn">auth</span>()-><span class="fn">login</span>(<span class="var">$user</span>);
    <span class="kw">return</span> <span class="fn">redirect</span>(<span class="str">'/dashboard'</span>);
}</pre></div>` }
      ]
    },
    qa: [
      { level:'easy', q:'إيه الـ Providers اللي بيدعمها Socialite بشكل افتراضي؟', a:`<p>Socialite الرسمي يدعم:</p><ul><li>GitHub</li><li>Google</li><li>Facebook</li><li>X (Twitter)</li><li>LinkedIn</li><li>GitLab</li><li>Bitbucket</li><li>Slack</li></ul><p>وفيه Socialite Providers مجتمع فيه 100+ provider إضافي.</p>` },
      { level:'medium', q:'إزاي بتتعامل مع حالة إن المستخدم عنده account قبل كده بالإيميل؟', a:`<div class="code-wrap"><div class="code-top"><span class="code-lang">php</span></div><pre class="code"><span class="var">$user</span> = <span class="cls">User</span>::<span class="fn">where</span>(<span class="str">'email'</span>, <span class="var">$socialUser</span>->email)->first();

<span class="kw">if</span> (<span class="var">$user</span>) {
    <span class="cm">// ربط الـ Social Account بالـ Account الموجود</span>
    <span class="var">$user</span>-><span class="fn">update</span>([<span class="str">'google_id'</span> => <span class="var">$socialUser</span>->id]);
} <span class="kw">else</span> {
    <span class="cm">// إنشاء Account جديد</span>
    <span class="var">$user</span> = <span class="cls">User</span>::<span class="fn">create</span>([...]);
}</pre></div>` },
    ]
  },

  // ==================== SAIL ====================
];
