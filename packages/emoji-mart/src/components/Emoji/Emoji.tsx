import { Data } from '../../config'
import { SearchIndex } from '../../helpers'

export default function Emoji(props) {
  let { id, skin, shortcodes, emoji } = props

  if (!emoji && !id && shortcodes) {
    const matches = shortcodes.match(SearchIndex.SHORTCODES_REGEX)
    if (matches) {
      id = matches[1]

      if (matches[2]) {
        skin = matches[2]
      }
    }
  }

  emoji || (emoji = SearchIndex.get(id))
  if (!emoji) return props.fallback

  const emojiSkin = emoji.skins[skin - 1] || emoji.skins[0]

  const src =
    emojiSkin.src ||
    (props.set != 'native' && !props.spritesheet
      ? `https://cdn.jsdelivr.net/npm/emoji-datasource-${props.set}@14.0.0/img/${props.set}/64/${emojiSkin.unified}.png`
      : undefined)

  return (
    <span class="emoji-mart-emoji" data-emoji-set={props.set}>
      {src ? (
        <img
          style={{
            height: props.size || '1em',
            width: 'auto',
            display: 'inline-block',
            position: 'relative',
            top: '.1em',
          }}
          alt={emojiSkin.native || emojiSkin.shortcodes}
          src={src}
        />
      ) : props.set == 'native' ? (
        <span
          style={{
            fontSize: props.size,
            fontFamily:
              '"EmojiMart", "Segoe UI Emoji", "Segoe UI Symbol", "Segoe UI", "Apple Color Emoji", "Twemoji Mozilla", "Noto Color Emoji", "Android Emoji"',
          }}
        >
          {emojiSkin.native}
        </span>
      ) : (
        <span
          style={{
            display: 'block',
            width: props.size,
            height: props.size,
            backgroundImage: `url(https://cdn.jsdelivr.net/npm/emoji-datasource-${props.set}@14.0.0/img/${props.set}/sheets-256/64.png)`,
            backgroundSize: `${100 * Data.sheet.cols}% ${
              100 * Data.sheet.rows
            }%`,
            backgroundPosition: `${
              (100 / (Data.sheet.cols - 1)) * emojiSkin.x
            }% ${(100 / (Data.sheet.rows - 1)) * emojiSkin.y}%`,
          }}
        ></span>
      )}
    </span>
  )
}
