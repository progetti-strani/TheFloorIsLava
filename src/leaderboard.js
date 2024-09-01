const token = 'dev_7c18eecf877e40839a54bc7dc74ce363'; // Game key from LootLocker.io

// Leaderboard APIs
const APIs = (pid) => ({
    LogInPlayer: async () => {
        return await fetch('https://api.lootlocker.io/game/v2/session/guest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                game_key: token,
                game_version: '1.0.0',
                player_identifier: pid
            })
        })
        .catch(error => console.error('Error:', error))
        .then(response => response.json())
        .then(data => {
            sessionStorage.setItem('session_token', data.session_token);
            sessionStorage.setItem('player_id', data.player_id);
            console.log('LogInPlayer:', data);
            return data;
        });
    },
    SubmitScore: async (score) => {
        return await fetch('https://api.lootlocker.io/game/leaderboards/24364/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-session-token': sessionStorage.getItem('session_token')
            },
            body: JSON.stringify({
                score: score
            })
        })
        .catch(error => console.error('Error:', error))
        .then(response => response.json())
        .then(data => {
            console.log('SubmitScore:', data);
            return data;
        });
    },
    GetHighScore: async () => {
        return await fetch('https://api.lootlocker.io/game/leaderboards/24364/member/' + sessionStorage.getItem('player_id'), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-session-token': sessionStorage.getItem('session_token')
            },
        })
        .catch(error => console.error('Error:', error))
        .then(response => response.json())
        .then(data => {
            sessionStorage.setItem('high_score', data.score);
            console.log('GetHighScore:', data);
            return data;
        });
    }
});

// Get player ID from local storage (if any)
const playerid = localStorage.getItem('playerid');

// Save player ID to local storage
localStorage.setItem('playerid', playerid);

// Log player ID to console (for debugging)
console.debug('Player ID:', playerid);

// Export leaderboard APIs
export const Leaderboard = APIs(playerid);
await Leaderboard.LogInPlayer();
await Leaderboard.GetHighScore();