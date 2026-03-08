// Laravel Pint
const PACKAGES = [
  {
    id:'pint', name:'Laravel Pint', icon:'✨', theme:'theme-green',
    subtitle:'laravel/pint', category:'Code Quality',
    desc:'PHP Code Style Fixer تلقائي — يصلح الـ Code Style بأمر واحد.',
    tags:['Code Style','Linting','Quality','PSR'],
    tutorial: {
      sections: [
        { title:'ما هو Pint؟', content:`<p class="tut-p">Pint هو Code Style Fixer رسمي من Laravel. بيصلح الـ Code Style تلقائياً بناءً على معايير Laravel أو PSR-12 أو أي Custom Rules.</p>` },
        { title:'التثبيت والاستخدام', content:`<div class="code-wrap"><div class="code-top"><span class="code-lang">bash</span></div><pre class="code"><span class="cm"># Pint جاي مع Laravel تلقائياً، أو:</span>
composer require laravel/pint --dev

<span class="cm"># تصليح كل الـ Files</span>
./vendor/bin/pint

<span class="cm"># معاينة التغييرات بدون تطبيق</span>
./vendor/bin/pint --test

<span class="cm"># Folder معين</span>
./vendor/bin/pint app/Http/Controllers</pre></div>` },
        { title:'التخصيص', content:`<div class="code-wrap"><div class="code-top"><span class="code-lang">json</span><span class="code-file">pint.json</span></div><pre class="code">{
    "preset": "laravel",
    "rules": {
        "simplified_null_return": true,
        "braces": false,
        "new_with_braces": {
            "anonymous_class": false,
            "named_class": false
        }
    }
}</pre></div>` },
        { title:'Pint في CI/CD', content:`<div class="code-wrap"><div class="code-top"><span class="code-lang">yaml</span><span class="code-file">.github/workflows/ci.yml</span></div><pre class="code">name: CI
on: [push, pull_request]
jobs:
  pint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: shivammathur/setup-php@v2
        with:
          php-version: '8.3'
      - run: composer install --no-interaction
      - name: Check code style
        run: ./vendor/bin/pint --test</pre></div><div class="alert alert-info"><div class="alert-icon">💡</div><div>استخدم <code>--test</code> في CI — بيفحص بس بدون تعديل. لو فيه مخالفة، الـ Pipeline يفشل.</div></div>` },
        { title:'Pint مع Git Hooks', content:`<div class="code-wrap"><div class="code-top"><span class="code-lang">bash</span><span class="code-file">.git/hooks/pre-commit</span></div><pre class="code">#!/bin/bash
./vendor/bin/pint --dirty
if [ $? -ne 0 ]; then
    echo "Code style violations found! Run: ./vendor/bin/pint"
    exit 1
fi</pre></div><p class="tut-p"><code>--dirty</code> بتصلح فقط الـ Files اللي اتعدلت في آخر commit — أسرع بكتير من فحص كل الملفات.</p>` },
      ]
    },
    qa: [
      { level:'easy', q:'ما هو Laravel Pint وما الـ Presets اللي بيدعمها؟', a:`<p>Pint هو Code Style Fixer رسمي مبني فوق PHP-CS-Fixer. الـ Presets:</p><ul><li><strong>laravel</strong> — معايير Laravel (الافتراضي)</li><li><strong>psr12</strong> — PSR-12 Standards</li><li><strong>per</strong> — PHP Extended Coding Style</li><li><strong>symfony</strong> — Symfony Standards</li></ul>` },
      { level:'easy', q:'إيه الفرق بين pint و pint --test؟', a:`<ul><li><code>./vendor/bin/pint</code> — يصلح الملفات مباشرة</li><li><code>./vendor/bin/pint --test</code> — يفحص فقط بدون تعديل، يرجع exit code 1 لو فيه مخالفة</li><li><code>./vendor/bin/pint --dirty</code> — يصلح الملفات المعدّلة فقط</li><li><code>./vendor/bin/pint -v</code> — verbose — يعرض كل التغييرات</li></ul>` },
      { level:'medium', q:'إزاي بتضيف Pint في CI/CD Pipeline؟', a:`<div class="code-wrap"><div class="code-top"><span class="code-lang">yaml</span><span class="code-file">.github/workflows/ci.yml</span></div><pre class="code">- name: Check code style
  run: ./vendor/bin/pint --test</pre></div><p>لو فيه أي مخالفة style، الـ Pipeline هيفشل ويمنع الـ Merge.</p>` },
      { level:'medium', q:'إزاي بتعمل Custom Rules في Pint؟', a:`<div class="code-wrap"><div class="code-top"><span class="code-lang">json</span><span class="code-file">pint.json</span></div><pre class="code">{
    "preset": "laravel",
    "rules": {
        "not_operator_with_successor_space": true,
        "ordered_imports": {
            "sort_algorithm": "alpha"
        },
        "phpdoc_order": true,
        "declare_strict_types": true
    },
    "exclude": [
        "vendor",
        "bootstrap/cache"
    ]
}</pre></div>` },
      { level:'hard', q:'إزاي بتستخدم Pint مع Pre-commit Hook؟', a:`<div class="code-wrap"><div class="code-top"><span class="code-lang">bash</span></div><pre class="code"><span class="cm"># إنشاء الـ Hook</span>
cat > .git/hooks/pre-commit << 'EOF'
#!/bin/bash
./vendor/bin/pint --dirty --test
if [ $? -ne 0 ]; then
    echo "❌ Code style errors!"
    echo "Run: ./vendor/bin/pint"
    exit 1
fi
EOF
chmod +x .git/hooks/pre-commit</pre></div><p>أو استخدم <code>captainhook/captainhook</code> أو <code>brainmaestro/composer-git-hooks</code> لإدارة Hooks أنيق.</p>` },
    ]
  },

  // ==================== PRECOGNITION ====================
];
