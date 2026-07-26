import { useState, useEffect, useCallback, useRef } from 'react';
import { WASTE_ITEMS, GAME_MODES, CATEGORY_NAMES, CATEGORY_COLORS, CATEGORY_ICONS } from '../../utils/gameData';
import { getHighScore, setHighScore, shuffleArray } from '../../utils/helpers';

export default function WasteSortingGame() {
  const [gameState, setGameState] = useState({
    mode: 'classic',
    score: 0,
    streak: 0,
    correct: 0,
    wrong: 0,
    isPlaying: false,
    isGameOver: false,
    currentItem: null,
    currentIndex: 0,
    usedIndices: [],
    answeredQuestions: 0,
    totalQuestions: 10,
    isLocked: false,
    timer: 60,
    message: '🌱 Chọn chế độ chơi để bắt đầu!',
    messageType: 'info',
  });

  const timerRef = useRef(null);
  const highScore = getHighScore();

  const resetGame = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setGameState(prev => ({
      ...prev,
      mode: prev.mode,
      score: 0,
      streak: 0,
      correct: 0,
      wrong: 0,
      isPlaying: true,
      isGameOver: false,
      currentItem: null,
      currentIndex: 0,
      usedIndices: [],
      answeredQuestions: 0,
      isLocked: false,
      timer: 60,
      message: prev.mode === 'learn' ? '📖 Chế độ Học Tập: Xem giải thích sau mỗi câu trả lời!' :
                prev.mode === 'timeattack' ? '⏱️ Chế độ 60 Giây: Phân loại càng nhiều càng tốt!' :
                prev.mode === 'challenge' ? '🏆 Thử Thách: Trả lời đúng 8/10 câu!' :
                '🌱 Cổ Điển: Phân loại rác không giới hạn!',
      messageType: 'info',
    }));
  }, []);

  const getRandomItem = useCallback(() => {
    setGameState(prev => {
      let used = [...prev.usedIndices];
      if (used.length >= WASTE_ITEMS.length) used = [];
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * WASTE_ITEMS.length);
      } while (used.includes(randomIndex));
      const item = WASTE_ITEMS[randomIndex];
      return {
        ...prev,
        currentItem: item,
        currentIndex: prev.currentIndex + 1,
        usedIndices: [...used, randomIndex],
      };
    });
  }, []);

  useEffect(() => {
    if (gameState.isPlaying && !gameState.currentItem) {
      getRandomItem();
    }
  }, [gameState.isPlaying, gameState.currentItem, getRandomItem]);

  useEffect(() => {
    if (gameState.isPlaying && gameState.mode === 'timeattack') {
      timerRef.current = setInterval(() => {
        setGameState(prev => {
          const newTimer = prev.timer - 1;
          if (newTimer <= 0) {
            clearInterval(timerRef.current);
            endGame();
            return { ...prev, timer: 0 };
          }
          return { ...prev, timer: newTimer };
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState.isPlaying, gameState.mode]);

  const endGame = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setGameState(prev => {
      const isNewHigh = setHighScore(prev.score);
      return { ...prev, isPlaying: false, isGameOver: true };
    });
  }, []);

  const switchMode = (mode) => {
    setGameState(prev => ({ ...prev, mode }));
    setTimeout(() => resetGame(), 100);
  };

  const checkSort = (category) => {
    setGameState(prev => {
      if (!prev.isPlaying || prev.isLocked || !prev.currentItem) return prev;

      const isCorrect = prev.currentItem.category === category;
      let newScore = prev.score;
      let newStreak = prev.streak;
      let newCorrect = prev.correct;
      let newWrong = prev.wrong;
      let message = '';
      let messageType = '';

      if (isCorrect) {
        newStreak++;
        const combo = Math.min(newStreak, 5);
        const points = 10 * combo;
        newScore += points;
        newCorrect++;
        message = `✅ Chính xác! +${points} điểm${combo > 1 ? ` (Combo x${combo})` : ''}`;
        messageType = 'correct';
      } else {
        newStreak = 0;
        newWrong++;
        message = `❌ Sai! "${prev.currentItem.name}" là ${CATEGORY_NAMES[prev.currentItem.category]}`;
        messageType = 'wrong';
      }

      const newAnswered = prev.answeredQuestions + 1;
      let isGameOver = false;
      if (prev.mode === 'challenge' && newAnswered >= prev.totalQuestions) {
        isGameOver = true;
      }

      setTimeout(() => {
        if (isGameOver) {
          endGame();
        } else {
          getRandomItem();
        }
      }, isCorrect ? 800 : 1500);

      return {
        ...prev,
        score: newScore,
        streak: newStreak,
        correct: newCorrect,
        wrong: newWrong,
        message,
        messageType,
        isLocked: true,
        answeredQuestions: newAnswered,
        isGameOver,
      };
    });

    // Unlock after delay
    setTimeout(() => {
      setGameState(prev => ({ ...prev, isLocked: false }));
    }, 800);
  };

  const timerPercentage = (gameState.timer / 60) * 100;
  const timerColor = gameState.timer <= 10 ? 'from-red-500 to-red-600' : gameState.timer <= 30 ? 'from-amber-400 to-amber-500' : 'from-emerald-400 to-cyan-400';

  return (
    <div className="bg-gradient-to-br from-ecoGreen-900 via-emerald-800 to-ecoGreen-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-2xl mt-20">
      <div className="absolute -right-8 -bottom-8 text-white/5 text-[150px] font-bold select-none pointer-events-none">
        <i className="fa-solid fa-leaf"></i>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <span className="bg-ecoGreen-600/50 border border-ecoGreen-500 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest text-ecoGreen-100">
            <i className="fa-solid fa-gamepad mr-1.5"></i>Góc giáo dục tương tác
          </span>
          <h4 className="text-2xl sm:text-3xl font-bold mt-2">Thử Thách Phân Loại Rác Xanh</h4>
          <p className="text-sm text-ecoGreen-200 mt-1">Chọn chế độ chơi và kiểm tra kiến thức của bạn!</p>
        </div>

        {/* Mode Selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {GAME_MODES.map((mode) => (
            <button
              key={mode.id}
              onClick={() => switchMode(mode.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold border transition-all duration-300 ${
                gameState.mode === mode.id
                  ? 'bg-emerald-500 border-emerald-300 text-white shadow-lg'
                  : 'border-white/30 text-white/80 hover:bg-white/10'
              }`}
            >
              <i className={`fa-solid ${mode.icon} mr-1`}></i>
              {mode.label}
            </button>
          ))}
        </div>

        {/* Stats Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 px-4 py-3 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <i className="fa-solid fa-star text-amber-400 text-sm"></i>
              <span className="text-xs font-bold">Điểm: <span className="text-amber-400 text-base">{gameState.score}</span></span>
            </div>
            <div className="flex items-center gap-1.5">
              <i className="fa-solid fa-fire text-orange-400 text-sm"></i>
              <span className="text-xs font-bold">Combo: <span className="text-orange-400">{gameState.streak}</span>x</span>
            </div>
            <div className="flex items-center gap-1.5">
              <i className="fa-solid fa-check-circle text-emerald-400 text-sm"></i>
              <span className="text-xs font-bold">Đúng: <span className="text-emerald-400">{gameState.correct}</span></span>
            </div>
            <div className="flex items-center gap-1.5">
              <i className="fa-solid fa-times-circle text-red-400 text-sm"></i>
              <span className="text-xs font-bold">Sai: <span className="text-red-400">{gameState.wrong}</span></span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {gameState.mode === 'timeattack' && (
              <span className="text-xs font-bold text-cyan-300">
                <i className="fa-solid fa-hourglass-half mr-1"></i>{gameState.timer}s
              </span>
            )}
            {gameState.mode === 'challenge' && (
              <span className="text-xs font-bold text-purple-300">
                {gameState.answeredQuestions}/{gameState.totalQuestions}
              </span>
            )}
            <button onClick={resetGame} className="text-xs underline text-white/60 hover:text-white font-semibold transition-colors">
              <i className="fa-solid fa-rotate-right mr-1"></i>Chơi lại
            </button>
          </div>
        </div>

        {/* Timer Bar */}
        {gameState.mode === 'timeattack' && gameState.isPlaying && (
          <div className="mb-4 w-full bg-white/10 rounded-full h-2 overflow-hidden">
            <div className={`bg-gradient-to-r ${timerColor} h-2 rounded-full transition-all duration-1000`} style={{ width: `${timerPercentage}%` }}></div>
          </div>
        )}

        {/* Game Board */}
        {!gameState.isGameOver && (
          <div className="space-y-5">
            {/* Waste Card */}
            <div className="flex flex-col items-center justify-center py-8 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 transition-all duration-300">
              <p className="text-xs text-ecoGreen-300 uppercase tracking-widest font-semibold mb-2">
                <span className="bg-white/10 px-2 py-0.5 rounded-full">
                  {gameState.mode === 'challenge' ? `Câu ${gameState.answeredQuestions + 1}/${gameState.totalQuestions}` : `Vật phẩm #${gameState.currentIndex}`}
                </span>
              </p>
              <div className="flex flex-col items-center">
                {gameState.currentItem && (
                  <>
                    <i className={`fa-solid ${gameState.currentItem.icon} text-6xl text-ecoBlue-300 transition-all duration-300`}></i>
                    <span className="text-xl font-bold mt-3 tracking-wide text-white">{gameState.currentItem.name}</span>
                    {gameState.currentItem.fact && gameState.mode !== 'learn' && (
                      <span className="text-xs text-ecoGreen-300 mt-2 max-w-md text-center italic px-4">{gameState.currentItem.fact}</span>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Bins */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {Object.entries(CATEGORY_NAMES).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => checkSort(key)}
                  disabled={!gameState.isPlaying || gameState.isLocked}
                  className={`${CATEGORY_COLORS[key]} rounded-2xl p-4 flex flex-col items-center space-y-2 shadow-lg transition-all duration-200 active:scale-95 group`}
                >
                  <div className="bg-white/10 p-3 rounded-xl group-hover:scale-110 transition-transform duration-200">
                    <i className={`fa-solid ${CATEGORY_ICONS[key]} text-3xl text-white`}></i>
                  </div>
                  <span className="font-bold text-sm text-white">{label}</span>
                </button>
              ))}
            </div>

            {/* Feedback */}
            <div className="flex items-center justify-between px-5 py-3 bg-white/5 rounded-xl border border-white/10 text-sm min-h-[48px]">
              <span className={`font-semibold ${gameState.messageType === 'correct' ? 'text-emerald-300' : gameState.messageType === 'wrong' ? 'text-red-300' : 'text-ecoGreen-200'}`}>
                {gameState.message}
              </span>
            </div>
          </div>
        )}

        {/* Game Over Screen */}
        {gameState.isGameOver && (
          <div className="text-center py-8">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 max-w-lg mx-auto">
              <i className="fa-solid fa-trophy text-6xl text-amber-400 mb-4"></i>
              <h3 className="text-2xl font-bold mb-2">
                {gameState.correct >= 8 ? '🎉 Vượt Qua Thử Thách!' : 'Trò Chơi Kết Thúc!'}
              </h3>
              <p className="text-sm text-ecoGreen-200 mb-6">
                {gameState.mode === 'timeattack' 
                  ? `⏱️ Phân loại ${gameState.correct + gameState.wrong} vật phẩm trong 60 giây!`
                  : gameState.mode === 'challenge'
                  ? `Đúng ${gameState.correct}/${gameState.totalQuestions}`
                  : `Đã phân loại ${gameState.currentIndex} vật phẩm`}
              </p>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-white/10 rounded-xl p-3">
                  <p className="text-2xl font-bold text-amber-400">{gameState.score}</p>
                  <p className="text-[10px] text-white/60">Điểm</p>
                </div>
                <div className="bg-white/10 rounded-xl p-3">
                  <p className="text-2xl font-bold text-emerald-400">{gameState.correct}</p>
                  <p className="text-[10px] text-white/60">Đúng</p>
                </div>
                <div className="bg-white/10 rounded-xl p-3">
                  <p className="text-2xl font-bold text-red-400">{gameState.wrong}</p>
                  <p className="text-[10px] text-white/60">Sai</p>
                </div>
              </div>
              <div className="text-sm text-amber-300 mb-4">🏆 Kỷ lục: {highScore} điểm</div>
              <button onClick={resetGame} className="bg-ecoGreen-600 hover:bg-ecoGreen-700 text-white font-bold px-8 py-3 rounded-full transition-all duration-200 shadow-lg">
                <i className="fa-solid fa-play mr-2"></i>Chơi Lại
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

