import * as vscode from 'vscode'
import fetch from 'node-fetch'

let enabled = true

async function send(path: string, payload: any) {
  try {
    await fetch('http://localhost:3000' + path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
  } catch {}
}

export function activate(context: vscode.ExtensionContext) {
  const toggle = vscode.commands.registerCommand('genesisObserver.toggle', () => {
    enabled = !enabled
    vscode.window.showInformationMessage(`GENESIS Observer ${enabled ? 'enabled' : 'disabled'}`)
  })
  context.subscriptions.push(toggle)

  vscode.workspace.onDidChangeTextDocument((e) => {
    if (!enabled) return
    send('/telemetry', {
      type: 'edit',
      file: e.document.uri.fsPath,
      changes: e.contentChanges.length,
      ts: Date.now()
    })
  })

  vscode.window.onDidChangeTextEditorSelection((e) => {
    if (!enabled) return
    send('/telemetry', {
      type: 'selection',
      file: e.textEditor.document.uri.fsPath,
      ranges: e.selections.length,
      ts: Date.now()
    })
  })

  vscode.workspace.onDidOpenTextDocument((doc) => {
    if (!enabled) return
    send('/telemetry', { type: 'open', file: doc.uri.fsPath, ts: Date.now() })
  })

  const watcher = vscode.workspace.createFileSystemWatcher('**/*')
  watcher.onDidCreate((uri) => enabled && send('/telemetry', { type: 'create', file: uri.fsPath, ts: Date.now() }))
  watcher.onDidDelete((uri) => enabled && send('/telemetry', { type: 'delete', file: uri.fsPath, ts: Date.now() }))
  watcher.onDidChange((uri) => enabled && send('/telemetry', { type: 'change', file: uri.fsPath, ts: Date.now() }))
  context.subscriptions.push(watcher)
}

export function deactivate() {}
