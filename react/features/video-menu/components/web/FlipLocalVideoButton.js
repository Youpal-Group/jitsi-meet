/* @flow */

import React, { PureComponent } from 'react';

import { translate } from '../../../base/i18n';
import { connect } from '../../../base/redux';
import { updateSettings } from '../../../base/settings';

import VideoMenuButton from './VideoMenuButton';

/**
 * The type of the React {@code Component} props of {@link FlipLocalVideoButton}.
 */
type Props = {

    /**
     * The current local flip x status.
     */
    _localFlipX: boolean,

    /**
     * The current local flip y status.
     */
     _localFlipY: boolean,

    /**
     * The redux dispatch function.
     */
    dispatch: Function,

    /**
     * Invoked to obtain translated strings.
     */
    t: Function
};

/**
 * Implements a React {@link Component} which displays a button for flipping the local viedo.
 *
 * @extends Component
 */
class FlipLocalVideoButton extends PureComponent<Props> {
    /**
     * Initializes a new {@code FlipLocalVideoButton} instance.
     *
     * @param {Object} props - The read-only React Component props with which
     * the new instance is to be initialized.
     */
    constructor(props: Props) {
        super(props);

        // Bind event handlers so they are only bound once for every instance.
        this._onClick = this._onClick.bind(this);
        this._onClickVertical = this._onClickVertical.bind(this);
    }

    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {null|ReactElement}
     */
    render() {
        const {
            t
        } = this.props;

        return (
            <view><VideoMenuButton
            buttonText = { t('videothumbnail.flip') }
            displayClass = 'fliplink'
            id = 'flipLocalVideoButton'
            onClick = { this._onClick } />
            <VideoMenuButton
            buttonText = { t('videothumbnail.flipVertical') }
            displayClass = 'fliplink'
            id = 'flipLocalVideoButton'
            onClick = { this._onClickVertical } /></view>    
            
        );
    }

    _onClick: () => void;
    _onClickVertical: () => void;

    /**
     * Flips the local video.
     *
     * @private
     * @returns {void}
     */
    _onClick() {
        const { _localFlipX, dispatch } = this.props;

        dispatch(updateSettings({
            localFlipX: !_localFlipX,
          }));
    }

    _onClickVertical() {
        const { _localFlipY, dispatch } = this.props;

        dispatch(updateSettings({
            localFlipY: !_localFlipY,
        }));
    }
}

/**
 * Maps (parts of) the Redux state to the associated {@code FlipLocalVideoButton}'s props.
 *
 * @param {Object} state - The Redux state.
 * @private
 * @returns {Props}
 */
function _mapStateToProps(state) {
    const { localFlipX, localFlipY } = state['features/base/settings'];

    return {
        _localFlipX: Boolean(localFlipX)
        ,_localFlipY: Boolean(localFlipY)
    };
}

export default translate(connect(_mapStateToProps)(FlipLocalVideoButton));
