/*! 钟飞的生活管理工作台 · 闹钟 Service Worker（xlsz.sw.js）
 *  与 index.html 放同一目录。职责：在锁屏/后台时按预定时间弹出喝水闹钟通知。
 *  由页面通过 showTrigger(TimestampTrigger) 预先调度，本文件只负责点击行为。 */
self.addEventListener("install", e => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));
/* 点击通知：聚焦已打开的应用，没有则打开 */
self.addEventListener("notificationclick", e => {
  e.notification.close();
  e.waitUntil((async () => {
    const cs = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    for (const c of cs) if ("focus" in c) return c.focus();
    try { return await self.clients.openWindow((e.notification.data && e.notification.data.url) || "./"); } catch (x) {}
  })());
});
