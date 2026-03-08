// Laravel Envoy
const PACKAGES = [
  {
    id:'envoy', name:'Laravel Envoy', icon:'📮', theme:'theme-green',
    subtitle:'laravel/envoy', category:'Deployment',
    desc:'Task Runner للـ Remote Servers — Deploy، SSH Tasks، Parallel Execution.',
    tags:['Deployment','SSH','Tasks','Automation'],
    tutorial: {
      sections: [
        { title:'ما هو Envoy؟', content:`<p class="tut-p">Envoy هو Task Runner بيشغل Commands على Remote Servers عبر SSH. مثالي للـ Deployment وـ Maintenance tasks.</p>` },
        { title:'إنشاء Envoy.blade.php', content:`<div class="code-wrap"><div class="code-top"><span class="code-lang">bash</span></div><pre class="code">composer require laravel/envoy --dev</pre></div><div class="code-wrap"><div class="code-top"><span class="code-lang">blade</span><span class="code-file">Envoy.blade.php</span></div><pre class="code">@servers(['web' => 'user@192.168.1.1', 'worker' => 'user@192.168.1.2'])

@task('deploy', ['on' => 'web'])
    cd /var/www/myapp
    git pull origin main
    composer install --no-dev
    php artisan migrate --force
    php artisan config:cache
    php artisan queue:restart
@endtask

@story('deploy-all')
    deploy
    restart-workers
@endstory</pre></div><div class="code-wrap"><div class="code-top"><span class="code-lang">bash</span></div><pre class="code">php vendor/bin/envoy run deploy
php vendor/bin/envoy run deploy-all</pre></div>` },
        { title:'Variables وـ Parallel Execution', content:`<div class="code-wrap"><div class="code-top"><span class="code-lang">blade</span><span class="code-file">Envoy.blade.php</span></div><pre class="code">@servers(['web-1' => '10.0.0.1', 'web-2' => '10.0.0.2', 'web-3' => '10.0.0.3'])

@setup
    $branch = 'main';
    $path   = '/var/www/app';
@endsetup

<span class="cm">{{-- تشغيل على كل الـ Servers في نفس الوقت --}}</span>
@task('deploy', ['on' => ['web-1', 'web-2', 'web-3'], 'parallel' => true])
    cd {{ $path }}
    git pull origin {{ $branch }}
    composer install --no-dev --no-interaction
    php artisan config:cache
    php artisan route:cache
@endtask

<span class="cm">{{-- تمرير Variables من Command Line --}}</span>
@task('deploy-branch', ['on' => 'web-1'])
    cd {{ $path }}
    git pull origin {{ $branch }}
@endtask</pre></div><div class="code-wrap"><div class="code-top"><span class="code-lang">bash</span></div><pre class="code">php vendor/bin/envoy run deploy-branch --branch=develop</pre></div>` },
        { title:'Notifications وـ Hooks', content:`<div class="code-wrap"><div class="code-top"><span class="code-lang">blade</span><span class="code-file">Envoy.blade.php</span></div><pre class="code">@servers(['web' => 'user@myserver.com'])

@before
    <span class="cm">{{-- ينفذ قبل أي Task --}}</span>
    echo "Starting deployment..."
@endbefore

@after
    <span class="cm">{{-- ينفذ بعد أي Task --}}</span>
    echo "Done!"
@endafter

@error
    <span class="cm">{{-- ينفذ لو حصل خطأ --}}</span>
    echo "Deployment failed!"
@enderror

@success
    <span class="cm">{{-- Slack Notification --}}</span>
    @slack('https://hooks.slack.com/...', '#deployments', '✅ تم النشر بنجاح!')
@endsuccess</pre></div>` },
      ]
    },
    qa: [
      { level:'easy', q:'ما هو Envoy وما الفرق بينه وبين مجرد SSH؟', a:`<p>Envoy بيوفر:</p><ul><li>Tasks معرّفة في ملف Blade منظم</li><li>تشغيل على Servers متعددة في نفس الوقت (Parallel)</li><li>Stories لتجميع Tasks في Workflow</li><li>Notifications لـ Slack/Discord بعد النشر</li><li>Hooks: قبل، بعد، عند الخطأ</li></ul>` },
      { level:'easy', q:'ما الفرق بين @task وـ @story في Envoy؟', a:`<ul><li><strong>@task</strong> — أمر أو مجموعة أوامر تتنفذ على Server</li><li><strong>@story</strong> — مجموعة Tasks بتتنفذ بالترتيب كـ Workflow واحد</li></ul><div class="code-wrap"><div class="code-top"><span class="code-lang">blade</span></div><pre class="code">@story('deploy')
    pull-code
    install-deps
    run-migrations
    clear-cache
@endstory</pre></div>` },
      { level:'medium', q:'إزاي بتنفذ Tasks على Servers متعددة في وقت واحد؟', a:`<div class="code-wrap"><div class="code-top"><span class="code-lang">blade</span></div><pre class="code">@task('deploy', ['on' => ['web-1', 'web-2', 'web-3'], 'parallel' => true])
    cd /var/www/app
    git pull origin main
    php artisan config:cache
@endtask</pre></div><p>بدون <code>parallel</code> بيتنفذ على كل Server واحد ورا التاني. مع <code>parallel</code> بيتنفذوا كلهم مع بعض.</p>` },
      { level:'medium', q:'إزاي بتضيف Slack Notification في Envoy؟', a:`<div class="code-wrap"><div class="code-top"><span class="code-lang">blade</span></div><pre class="code">@success
    @slack('https://hooks.slack.com/services/T.../B.../...', '#deployments', '✅ تم النشر!')
@endsuccess

@error
    @slack('https://hooks.slack.com/services/T.../B.../...', '#alerts', '❌ فشل النشر!')
@enderror</pre></div>` },
    ]
  },

  // ==================== FOLIO ====================
];
