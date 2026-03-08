// Laravel Reverb
const PACKAGES = [
  {
    id:'reverb', name:'Laravel Reverb', icon:'📡', theme:'theme-purple',
    subtitle:'laravel/reverb', category:'WebSockets',
    desc:'WebSocket Server رسمي من Laravel — Real-time Events بدون Pusher.',
    tags:['WebSockets','Real-time','Broadcasting','Events'],
    tutorial: {
      sections: [
        { title:'ما هو Reverb؟', content:`<p class="tut-p">Reverb هو WebSocket Server رسمي مبني على Laravel. البديل الـ Self-hosted لـ Pusher.</p><div class="code-wrap"><div class="code-top"><span class="code-lang">bash</span></div><pre class="code">php artisan install:broadcasting
<span class="cm"># أو يدوياً:</span>
composer require laravel/reverb
php artisan reverb:install</pre></div>` },
        { title:'التشغيل والإعداد', content:`<div class="code-wrap"><div class="code-top"><span class="code-lang">bash</span></div><pre class="code">php artisan reverb:start
<span class="cm"># مع Debug</span>
php artisan reverb:start --debug
<span class="cm"># Port مخصص</span>
php artisan reverb:start --port=8080</pre></div><div class="code-wrap"><div class="code-top"><span class="code-lang">env</span></div><pre class="code">BROADCAST_CONNECTION=reverb
REVERB_APP_ID=my-app
REVERB_APP_KEY=my-key
REVERB_APP_SECRET=my-secret
REVERB_HOST=localhost
REVERB_PORT=8080</pre></div>` },
        { title:'Broadcasting Events', content:`<div class="code-wrap"><div class="code-top"><span class="code-lang">php</span><span class="code-file">OrderShipped.php</span></div><pre class="code"><span class="kw">class</span> <span class="cls">OrderShipped</span> <span class="kw">implements</span> <span class="cls">ShouldBroadcast</span>
{
    <span class="kw">public function</span> <span class="fn">broadcastOn</span>(): <span class="cls">Channel</span>
    {
        <span class="kw">return</span> <span class="kw">new</span> <span class="cls">PrivateChannel</span>(<span class="str">'orders.'</span> . <span class="var">$this</span>->order->id);
    }

    <span class="kw">public function</span> <span class="fn">broadcastWith</span>()
    {
        <span class="kw">return</span> [<span class="str">'order_id'</span> => <span class="var">$this</span>->order->id, <span class="str">'status'</span> => <span class="str">'shipped'</span>];
    }
}

<span class="cm">// Frontend (Echo)</span>
<span class="cls">Echo</span>.<span class="fn">private</span>(<span class="str">\`orders.&#36;{orderId}\`</span>)
    .<span class="fn">listen</span>(<span class="str">'OrderShipped'</span>, (e) => {
        console.<span class="fn">log</span>(e.order_id);
    });</pre></div>` },
        { title:'Channel Authorization', content:`<div class="code-wrap"><div class="code-top"><span class="code-lang">php</span><span class="code-file">routes/channels.php</span></div><pre class="code"><span class="cm">// Private Channel — تحقق من الصلاحية</span>
<span class="cls">Broadcast</span>::<span class="fn">channel</span>(<span class="str">'orders.{orderId}'</span>, <span class="kw">function</span>(<span class="cls">User</span> <span class="var">$user</span>, <span class="kw">int</span> <span class="var">$orderId</span>) {
    <span class="kw">return</span> <span class="cls">Order</span>::<span class="fn">where</span>(<span class="str">'id'</span>, <span class="var">$orderId</span>)
                 -><span class="fn">where</span>(<span class="str">'user_id'</span>, <span class="var">$user</span>->id)
                 -><span class="fn">exists</span>();
});

<span class="cm">// Presence Channel — من هو متصل؟</span>
<span class="cls">Broadcast</span>::<span class="fn">channel</span>(<span class="str">'chat.{roomId}'</span>, <span class="kw">function</span>(<span class="cls">User</span> <span class="var">$user</span>, <span class="kw">int</span> <span class="var">$roomId</span>) {
    <span class="kw">if</span> (<span class="var">$user</span>-><span class="fn">canJoinRoom</span>(<span class="var">$roomId</span>)) {
        <span class="kw">return</span> [<span class="str">'id'</span> => <span class="var">$user</span>->id, <span class="str">'name'</span> => <span class="var">$user</span>->name];
    }
});</pre></div>` },
        { title:'Reverb في Production', content:`<div class="code-wrap"><div class="code-top"><span class="code-lang">bash</span></div><pre class="code"><span class="cm"># تشغيل مع Supervisor</span>
php artisan reverb:start --host=0.0.0.0 --port=8080

<span class="cm"># وراء Nginx</span>
<span class="cm"># في nginx.conf:</span>
location /app {
    proxy_pass         http://localhost:8080;
    proxy_http_version 1.1;
    proxy_set_header   Upgrade &#36;http_upgrade;
    proxy_set_header   Connection "upgrade";
    proxy_set_header   Host &#36;host;
}</pre></div><div class="code-wrap"><div class="code-top"><span class="code-lang">env</span></div><pre class="code">REVERB_SERVER_HOST=0.0.0.0
REVERB_SERVER_PORT=8080
REVERB_APP_ID=my-app-id
REVERB_APP_KEY=my-app-key
REVERB_APP_SECRET=my-app-secret
VITE_REVERB_HOST="&#36;{APP_URL}"
VITE_REVERB_PORT=443
VITE_REVERB_SCHEME=https</pre></div>` },
        { title:'Echo Frontend Setup', content:`<div class="code-wrap"><div class="code-top"><span class="code-lang">bash</span></div><pre class="code">npm install --save-dev laravel-echo pusher-js</pre></div><div class="code-wrap"><div class="code-top"><span class="code-lang">javascript</span><span class="code-file">resources/js/bootstrap.js</span></div><pre class="code"><span class="kw">import</span> <span class="cls">Echo</span> <span class="kw">from</span> <span class="str">'laravel-echo'</span>;
<span class="kw">import</span> <span class="cls">Pusher</span> <span class="kw">from</span> <span class="str">'pusher-js'</span>;

window.Pusher = Pusher;
window.Echo = <span class="kw">new</span> <span class="cls">Echo</span>({
    broadcaster: <span class="str">'reverb'</span>,
    key:         <span class="kw">import</span>.meta.env.VITE_REVERB_APP_KEY,
    wsHost:      <span class="kw">import</span>.meta.env.VITE_REVERB_HOST,
    wsPort:      <span class="kw">import</span>.meta.env.VITE_REVERB_PORT ?? <span class="num">80</span>,
    wssPort:     <span class="kw">import</span>.meta.env.VITE_REVERB_PORT ?? <span class="num">443</span>,
    forceTLS:    (<span class="kw">import</span>.meta.env.VITE_REVERB_SCHEME ?? <span class="str">'https'</span>) === <span class="str">'https'</span>,
    enabledTransports: [<span class="str">'ws'</span>, <span class="str">'wss'</span>],
});

<span class="cm">// Presence Channel مثال</span>
<span class="cls">Echo</span>.<span class="fn">join</span>(<span class="str">\`chat.&#36;{roomId}\`</span>)
    .<span class="fn">here</span>((users) => console.<span class="fn">log</span>(<span class="str">'متصل:'</span>, users))
    .<span class="fn">joining</span>((user) => console.<span class="fn">log</span>(<span class="str">'دخل:'</span>, user.name))
    .<span class="fn">leaving</span>((user) => console.<span class="fn">log</span>(<span class="str">'خرج:'</span>, user.name))
    .<span class="fn">listen</span>(<span class="str">'NewMessage'</span>, (e) => console.<span class="fn">log</span>(e.message));</pre></div>` },
      ]
    },
    qa: [
      { level:'easy', q:'ما هو Reverb وكيف يختلف عن Pusher؟', a:`<table class="compare-table"><tr><th>Reverb</th><th>Pusher</th></tr><tr><td>Self-hosted على سيرفرك</td><td>Cloud Service خارجي</td></tr><tr><td>مجاني تماماً</td><td>محدود في الـ Free plan</td></tr><tr><td>خصوصية كاملة</td><td>البيانات على Servers خارجية</td></tr><tr><td>يحتاج Setup وصيانة</td><td>Plug & Play بدون إعداد</td></tr></table>` },
      { level:'easy', q:'إيه أنواع الـ Channels في Broadcasting؟', a:`<ul><li><strong>Public Channel</strong> — أي حد يقدر يشترك: <code>new Channel('name')</code></li><li><strong>Private Channel</strong> — بيتحقق من الـ Auth أولاً: <code>new PrivateChannel('name')</code></li><li><strong>Presence Channel</strong> — بيعرف مين متصل الآن: <code>new PresenceChannel('name')</code></li></ul>` },
      { level:'medium', q:'إزاي بتعمل Channel Authorization في Reverb؟', a:`<div class="code-wrap"><div class="code-top"><span class="code-lang">php</span><span class="code-file">routes/channels.php</span></div><pre class="code"><span class="cls">Broadcast</span>::<span class="fn">channel</span>(<span class="str">'orders.{id}'</span>, <span class="kw">function</span>(<span class="cls">User</span> <span class="var">$user</span>, <span class="kw">int</span> <span class="var">$id</span>) {
    <span class="kw">return</span> <span class="var">$user</span>->id === <span class="cls">Order</span>::<span class="fn">findOrFail</span>(<span class="var">$id</span>)->user_id;
});</pre></div><p>لو الـ callback رجّع <code>true</code> أو array، المستخدم مسموح له. لو <code>false</code>، يتمنع.</p>` },
      { level:'medium', q:'إزاي بتبعت Event لـ User محدد فقط؟', a:`<div class="code-wrap"><div class="code-top"><span class="code-lang">php</span></div><pre class="code"><span class="kw">use</span> <span class="cls">Illuminate\\Support\\Facades\\Broadcast</span>;

<span class="cm">// إرسال لـ User محدد</span>
<span class="cls">Broadcast</span>::<span class="fn">private</span>(<span class="str">'App.Models.User.'</span> . <span class="var">$userId</span>)-><span class="fn">event</span>(<span class="kw">new</span> <span class="cls">PaymentReceived</span>(<span class="var">$payment</span>));

<span class="cm">// أو باستخدام Notification Channel</span>
<span class="var">$user</span>-><span class="fn">notify</span>(<span class="kw">new</span> <span class="cls">InvoicePaid</span>(<span class="var">$invoice</span>));

<span class="cm">// في الـ Notification</span>
<span class="kw">public function</span> <span class="fn">via</span>(): <span class="kw">array</span> { <span class="kw">return</span> [<span class="str">'broadcast'</span>]; }</pre></div>` },
      { level:'hard', q:'إزاي بتشغل Reverb في Production وراء Nginx؟', a:`<p>تحتاج 3 خطوات:</p><ol><li>تشغيل Reverb Worker بـ Supervisor</li><li>إعداد Nginx كـ WebSocket Proxy</li><li>SSL Certificate لـ WSS</li></ol><div class="code-wrap"><div class="code-top"><span class="code-lang">nginx</span></div><pre class="code">location /app/ {
    proxy_pass         http://127.0.0.1:8080;
    proxy_http_version 1.1;
    proxy_set_header   Upgrade &#36;http_upgrade;
    proxy_set_header   Connection "upgrade";
    proxy_read_timeout 60s;
}</pre></div>` },
    ]
  },

  // ==================== OCTANE ====================
];
