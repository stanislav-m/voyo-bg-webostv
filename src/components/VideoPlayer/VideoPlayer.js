import shaka from 'shaka-player/dist/shaka-player.ui';
import React from 'react';
import 'shaka-player/dist/controls.css';

/**
 * A React component for shaka-player.
 * @param {string} src
 * @param {shaka.extern.PlayerConfiguration} config
 * @param {boolean} autoPlay
 * @param {number} width
 * @param {number} height
 * @param ref
 * @returns {*}
 * @constructor
 */
//function ShakaPlayer({ src, config, chromeless, className, ...rest }, ref) {
function ShakaPlayer({ src, config, className, ...rest }, ref) {
    const uiContainerRef = React.useRef(null);
  const videoRef = React.useRef(null);

  const [player, setPlayer] = React.useState(null);
//  const [ui, setUi] = React.useState(null);

  // Effect to handle component mount & mount.
  // Not related to the src prop, this hook creates a shaka.Player instance.
  // This should always be the first effect to run.
  React.useEffect(() => {
    const _player = new shaka.Player(videoRef.current);
    setPlayer(_player);
    /*
    let _ui = null;
    if (!chromeless) {
      const __ui = new shaka.ui.Overlay(
        _player,
        uiContainerRef.current,
        videoRef.current
      );
      setUi(__ui);
    }
    */
    return () => {
      _player.destroy();
      /*
      if (_ui) {
        _ui.destroy();
      }
      */
    };
  }, []);

  // Keep shaka.Player.configure in sync.
  React.useEffect(() => {
    if (player && config) {
      player.configure(config);
    }
  }, [player, config]);

  // Load the source url when we have one.
  React.useEffect(() => {
    if (player && src) {
      player.load(src);
    }
  }, [player, src]);

  // Define a handle for easily referencing Shaka's player & ui API's.
  React.useImperativeHandle(
    ref,
    () => ({
      get player() {
        return player;
      },
      /*
      get ui() {
        return ui;
      },
      */
      get videoElement() {
        return videoRef.current;
      }
    }),
    [player/*, ui*/]
  );

  return (
    <div ref={uiContainerRef} className={className}>
      <video
        ref={videoRef}
        style={{
          maxWidth: '100%',
          width: '100%'
        }}
        {...rest}
        controls
      />
    </div>
  );
}

export default React.forwardRef(ShakaPlayer);
