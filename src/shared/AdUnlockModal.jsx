import { useEffect, useRef, useState } from 'react'

const AD_DURATION = 15 // seconds

/**
 * Simulated rewarded-ad flow for unlocking a premium template for free.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * PRODUCTION INTEGRATION POINT
 * ─────────────────────────────────────────────────────────────────────────
 * This component simulates a rewarded video ad with a countdown timer so the
 * unlock flow is fully functional to test and demo. To go live with a real
 * ad network, replace the simulated countdown in `startAd()` below with a
 * call to your ad SDK's rewarded-ad API, and only call `onComplete()` from
 * that SDK's "reward earned" callback. For example:
 *
 *   Google AdSense/AdMob (web):  google.ima or a mediation SDK's
 *     rewarded ad unit, listening for the `REWARDED` event before unlocking.
 *   Third-party rewarded-ad networks (e.g. Unity Ads, AppLovin MAX for web):
 *     call their `showRewardedAd()` method and unlock in its success callback.
 *
 * Do not unlock the template until the ad SDK confirms the reward was
 * actually earned (i.e. don't call onComplete() optimistically).
 * ─────────────────────────────────────────────────────────────────────────
 */
export default function AdUnlockModal({
  open,
  templateName,
  onClose,
  onComplete,
}) {
  const [secondsLeft, setSecondsLeft] = useState(AD_DURATION)
  const [finished, setFinished] = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (!open) return

    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: reset the countdown each time the modal is (re)opened
    setSecondsLeft(AD_DURATION)
    setFinished(false)

    intervalRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(intervalRef.current)
          setFinished(true)
          return 0
        }
        return s - 1
      })
    }, 1000)

    return () => clearInterval(intervalRef.current)
  }, [open])

  if (!open) return null

  const progress =
    ((AD_DURATION - secondsLeft) / AD_DURATION) * 100

  return (
    <div
      className="
        fixed inset-0 z-[300]
        bg-black/70
        flex items-center justify-center
        p-4
      "
    >
      <div
        className="
          w-full max-w-sm
          rounded-3xl
          bg-zinc-900
          text-white
          p-7
          shadow-2xl
        "
      >
        <p className="text-xs font-bold tracking-wide text-blue-400 mb-1">
          UNLOCK PREMIUM TEMPLATE
        </p>

        <h2 className="text-xl font-black mb-4">
          {templateName}
        </h2>

        {/* SIMULATED AD SURFACE */}
        <div
          className="
            relative
            h-40
            rounded-2xl
            bg-gradient-to-br
            from-zinc-700
            to-zinc-800
            flex flex-col items-center justify-center
            mb-4
            overflow-hidden
          "
        >
          {!finished ? (
            <>
              <span className="text-4xl mb-2">📺</span>
              <span className="text-sm text-zinc-300">
                Ad playing… {secondsLeft}s
              </span>
            </>
          ) : (
            <>
              <span className="text-4xl mb-2">✅</span>
              <span className="text-sm text-zinc-300">
                Ad complete — reward earned!
              </span>
            </>
          )}

          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-black/30">
            <div
              className="h-full bg-blue-500 transition-all duration-1000 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <p className="text-xs text-zinc-400 mb-5 leading-5">
          Watch this short ad to unlock this template for free, forever —
          no payment needed.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="
              flex-1 p-3
              rounded-2xl
              bg-zinc-800
              text-zinc-300
              font-semibold
              hover:bg-zinc-700
              transition-all
            "
          >
            Cancel
          </button>

          <button
            disabled={!finished}
            onClick={() => {
              onComplete()
              onClose()
            }}
            className={`
              flex-1 p-3
              rounded-2xl
              font-semibold
              transition-all

              ${
                finished
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
              }
            `}
          >
            {finished ? 'Unlock' : 'Please wait…'}
          </button>
        </div>
      </div>
    </div>
  )
}
