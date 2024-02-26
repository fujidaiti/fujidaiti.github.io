---
title: SchedulerBinding.instance.schedulerPhaseを使う
description: After learning some Astro, I couldn't stop!
pubDate: 2023-12-29
tags: [flutter]
---

例えば `ChangeNotifier.notifyListeners` を呼んでも良いタイミングかどうか知りたい時がある。もしビルド中に通知して、リスナーの１人が `State.setState` を呼んだりするとエラーになってしまう。アプリケーションのコードを書いているときにこんなケースが出てくることはあまりないだろうが、パッケージなんかを作っていると稀に遭遇する。そんな時に使えるのが `SchedulerBinding.schedulerPhase` 。

`schedulerPhase` はプロダクションコードにも使って大丈夫なのだろうかと心配になるかもしれない。どう見ても正攻法とは思えないから。実際、デバッグビルドでしか使えない関数がある。でも `schedulePhase` は `NavigatorState` のコード内でも使用されているので全然問題なさそう。以下は `NavigatorState._handleHistoryChanged` メソッドからの抜粋（3488行目）。 `NavigationNotification` の通知タイミングを遅らせるかどうかを現在の `schedulePhase` を元に判断している。

```dart
// Avoid dispatching a notification in the middle of a build.
    switch (SchedulerBinding.instance.schedulerPhase) {
      case SchedulerPhase.postFrameCallbacks:
        notification.dispatch(context);
      case SchedulerPhase.idle:
      case SchedulerPhase.midFrameMicrotasks:
      case SchedulerPhase.persistentCallbacks:
      case SchedulerPhase.transientCallbacks:
        SchedulerBinding.instance.addPostFrameCallback((Duration timeStamp) {
          if (!mounted) {
            return;
          }
          notification.dispatch(context);
        });
    }
```
