// Laravel Dusk
const PACKAGES = [
  {
    id:'dusk', name:'Laravel Dusk', icon:'🌙', theme:'theme-purple',
    subtitle:'laravel/dusk', category:'Testing',
    desc:'Browser Testing — اختبار JavaScript-driven pages بـ Chrome headless.',
    tags:['Testing','Browser','E2E','Automation'],
    tutorial: {
      sections: [
        { title:'ما هو Dusk؟', content:`<p class="tut-p">Dusk هو Browser Testing framework — بيشغل Chrome فعلياً ويتحكم فيه. مثالي لاختبار الـ Pages اللي فيها JavaScript.</p>` },
        { title:'التثبيت', content:`<div class="code-wrap"><div class="code-top"><span class="code-lang">bash</span></div><pre class="code">composer require laravel/dusk --dev
php artisan dusk:install
php artisan dusk:chrome-driver --detect</pre></div>` },
        { title:'كتابة Tests', content:`<div class="code-wrap"><div class="code-top"><span class="code-lang">bash</span></div><pre class="code">php artisan dusk:make LoginTest</pre></div><div class="code-wrap"><div class="code-top"><span class="code-lang">php</span><span class="code-file">tests/Browser/LoginTest.php</span></div><pre class="code"><span class="kw">class</span> <span class="cls">LoginTest</span> <span class="kw">extends</span> <span class="cls">DuskTestCase</span>
{
    <span class="kw">public function</span> <span class="fn">test_user_can_login</span>()
    {
        <span class="var">$this</span>-><span class="fn">browse</span>(<span class="kw">function</span>(<span class="cls">Browser</span> <span class="var">$browser</span>) {
            <span class="var">$browser</span>-><span class="fn">visit</span>(<span class="str">'/login'</span>)
                    -><span class="fn">type</span>(<span class="str">'email'</span>, <span class="str">'test@test.com'</span>)
                    -><span class="fn">type</span>(<span class="str">'password'</span>, <span class="str">'password'</span>)
                    -><span class="fn">press</span>(<span class="str">'تسجيل الدخول'</span>)
                    -><span class="fn">assertPathIs</span>(<span class="str">'/dashboard'</span>)
                    -><span class="fn">assertSee</span>(<span class="str">'مرحباً'</span>);
        });
    }
}</pre></div><div class="code-wrap"><div class="code-top"><span class="code-lang">bash</span></div><pre class="code">php artisan dusk</pre></div>` }
      ]
    },
    qa: [
      { level:'easy', q:'ما هو Laravel Dusk وما الفرق بينه وبين PHPUnit؟', a:`<table class="compare-table"><tr><th>Dusk</th><th>PHPUnit</th></tr><tr><td>Browser Testing</td><td>Unit/Feature Testing</td></tr><tr><td>يشغل Chrome فعلياً</td><td>HTTP requests بدون browser</td></tr><tr><td>يختبر JavaScript</td><td>لا يختبر JavaScript</td></tr><tr><td>أبطأ</td><td>أسرع</td></tr></table>` },
      { level:'medium', q:'إزاي بتعمل Screenshot لما Test يفشل؟', a:`<p>Dusk بيعمل Screenshot تلقائياً لما Test يفشل في <code>tests/Browser/screenshots/</code>. أو يدوياً:</p><div class="code-wrap"><div class="code-top"><span class="code-lang">php</span></div><pre class="code"><span class="var">$browser</span>-><span class="fn">screenshot</span>(<span class="str">'login-page'</span>);</pre></div>` },
    ]
  },

  // ==================== SOCIALITE ====================
];
