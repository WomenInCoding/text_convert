// 변환 함수
function convertText() {
    const inputText = document.getElementById('inputText').value;
    const outputText = document.getElementById('outputText');
    let text = inputText;

    // 빈 줄만 제거 (일반 개행은 유지)
    text = text.replace(/\n\s*\n/g, '\n');

    // 제로 너비 공백 문자 제거
    text = text.replace(/[\u200B-\u200D\uFEFF]/g, '');

    outputText.value = text;
}

function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000); // 2초 후에 알림 사라짐
}

// 자동 변환 체크박스 상태에 따른 실시간 변환 처리
document.getElementById('inputText').addEventListener('input', function () {
    const isAutoChecked = document.getElementById('isAuto').checked;
    if (isAutoChecked) {
        convertText();
    }
});

// 자동 변환 체크박스 상태 변경 시 처리
document.getElementById('isAuto').addEventListener('change', function () {
    if (this.checked) {
        // 자동 변환이 켜지면 즉시 변환 실행
        convertText();
        showNotification('자동 변환이 활성화되었습니다.');
    } else {
        showNotification('자동 변환이 비활성화되었습니다.');
    }
});

document.getElementById('convertBtn').addEventListener('click', function () {
    convertText();
    showNotification('변환이 완료되었습니다.');
});

document.getElementById('clearBtn').addEventListener('click', function () {
    document.getElementById('inputText').value = '';
    document.getElementById('outputText').value = '';
    showNotification('모든 내용이 삭제되었습니다.');
});

// 붙여넣기 버튼 기능
document.getElementById('pasteBtn').addEventListener('click', function () {
    navigator.clipboard.readText()
        .then(text => {
            document.getElementById('inputText').value = text;
            // 자동 변환이 켜져 있다면 즉시 변환
            if (document.getElementById('isAuto').checked) {
                convertText();
            }
            showNotification('클립보드에서 텍스트를 붙여넣었습니다.');
        })
        .catch(err => {
            showNotification('클립보드에서 텍스트를 가져올 수 없습니다.');
            console.error('Failed to read clipboard contents: ', err);
        });
});

// 복사하기 버튼 기능
document.getElementById('copyBtn').addEventListener('click', function () {
    const outputText = document.getElementById('outputText').value;
    navigator.clipboard.writeText(outputText)
        .then(() => {
            showNotification('성공적으로 복사되었습니다!');
        })
        .catch(err => {
            showNotification('복사하는데 실패했습니다.');
            console.error('Failed to copy text: ', err);
        });
});