
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

console.log("正在启动幸运占卜屋...");

const rootElement = document.getElementById('root');

if (!rootElement) {
  const msg = "找不到 DOM 根节点 #root";
  console.error(msg);
  document.body.innerHTML = `<div style="color:red;padding:20px;">${msg}</div>`;
} else {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(<App />);
    console.log("React 渲染成功");
  } catch (error) {
    console.error("渲染阶段出错:", error);
    rootElement.innerHTML = `<div style="color:red;padding:20px;">渲染出错: ${String(error)}</div>`;
  }
}
