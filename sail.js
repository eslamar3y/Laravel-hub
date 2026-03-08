// Laravel Sail
const PACKAGES = [
  {
    id:'sail', name:'Laravel Sail', icon:'⛵', theme:'theme-blue',
    subtitle:'laravel/sail', category:'Development',
    desc:'Docker Development Environment سهل لـ Laravel — MySQL، Redis، Mailpit وأكتر.',
    tags:['Docker','Development','Environment','CLI'],
    tutorial: {
      sections: [
        { title:'ما هو Sail؟', content:`<p class="tut-p">Sail هو CLI بسيط لإدارة Docker environment لـ Laravel. بيجي مع MySQL، PostgreSQL، Redis، Mailpit، Selenium وأكتر.</p>` },
        { title:'التثبيت والتشغيل', content:`<div class="code-wrap"><div class="code-top"><span class="code-lang">bash</span></div><pre class="code"><span class="cm"># مع مشروع جديد</span>
laravel new myapp --using=sail

<span class="cm"># لمشروع موجود</span>
composer require laravel/sail --dev
php artisan sail:install

<span class="cm"># تشغيل الـ Containers</span>
./vendor/bin/sail up
./vendor/bin/sail up -d  <span class="cm"># في الخلفية</span>

<span class="cm"># Alias مريح</span>
alias sail='./vendor/bin/sail'</pre></div><div class="code-wrap"><div class="code-top"><span class="code-lang">bash</span></div><pre class="code"><span class="cm"># أوامر Artisan</span>
sail artisan migrate
sail artisan queue:work

<span class="cm"># Composer</span>
sail composer require package

<span class="cm"># NPM</span>
sail npm install
sail npm run dev

<span class="cm"># Tests</span>
sail test
sail pest</pre></div>` },
        { title:'تخصيص docker-compose.yml', content:`<div class="code-wrap"><div class="code-top"><span class="code-lang">bash</span></div><pre class="code"><span class="cm"># إضافة Services جديدة</span>
php artisan sail:add
<span class="cm"># يتيح: mysql, redis, pgsql, mariadb, sqlite,</span>
<span class="cm"># mailpit, selenium, meilisearch, typesense, soketi</span></pre></div>` }
      ]
    },
    qa: [
      { level:'easy', q:'ما هو Laravel Sail وما فائدته؟', a:`<p>Sail هو Docker-based development environment. بيوفر:</p><ul><li>PHP + extensions مناسبة</li><li>MySQL / PostgreSQL</li><li>Redis</li><li>Mailpit (Email testing)</li><li>Node.js</li></ul><p>بدون ما تثبت أي حاجة على جهازك غير Docker.</p>` },
      { level:'medium', q:'إزاي بتعمل Custom Docker Service في Sail؟', a:`<p>بتعدّل ملف <code>docker-compose.yml</code> مباشرة وتضيف الـ Service الجديدة.</p>` },
    ]
  },

  // ==================== PINT ====================
];
