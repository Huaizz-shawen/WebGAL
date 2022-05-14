import {ISentence} from '@/Core/interface/coreInterface/sceneInterface';
import {getRandomPerformName} from '@/Core/util/getRandomPerformName';
import {runtime_gamePlay} from '@/Core/runtime/gamePlay';
import {unmountPerform} from '../../perform/unmountPerform';
import {logger} from '@/Core/util/logger';
import {webgalStore} from "@/Core/store/store";
import {setStage} from "@/Core/store/stageReducer";

/**
 * 播放一段语音
 * @param sentence 语句
 */
export const playVocal = (sentence: ISentence) => {
    logger.debug('单次播放语音');
    const performInitName: string = getRandomPerformName();
    let url = ''; // 获取语音的url
    for (const e of sentence.args) {
        if (e.key === 'vocal') {
            url = e.value.toString();
        }
    }
    // 先停止之前的语音
    let VocalControl: any = document.getElementById('currentVocal');
    if (VocalControl !== null) {
        VocalControl.currentTime = 0;
        VocalControl.pause();
    }
    // 获得舞台状态
    webgalStore.dispatch(setStage({key: 'vocal', value: url}));
    // 播放语音
    setTimeout(() => {
        let VocalControl: any = document.getElementById('currentVocal');
        if (VocalControl !== null) {
            VocalControl.currentTime = 0;
            // 播放并作为一个特别演出加入
            VocalControl.oncanplay = () => {
                VocalControl.play();
                const perform = {
                    performName: performInitName,
                    duration: 1000 * 60 * 60,
                    isOver: false,
                    isHoldOn: true,
                    stopFunction: () => {
                    },
                    blockingNext: () => false,
                    blockingAuto: () => true,
                    stopTimeout: undefined, // 暂时不用，后面会交给自动清除
                };
                runtime_gamePlay.performList.push(perform);
            };
            VocalControl.onended = () => {
                for (const e of runtime_gamePlay.performList) {
                    if (e.performName === performInitName) {
                        e.isOver = true;
                        e.stopFunction();
                        unmountPerform(e.performName);
                    }
                }
            };
        }
    }, 1);
};
