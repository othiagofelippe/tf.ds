#!/bin/bash
# Analisa o que mudou e sugere o próximo passo baseado nas ferramentas disponíveis do tf.ds

CHANGED=$(git status --short 2>/dev/null)

if [ -z "$CHANGED" ]; then
  exit 0
fi

SUGGESTIONS=()

# Spec criada mas componente ainda não existe
SPEC_FILES=$(echo "$CHANGED" | grep -E 'docs/specs/[^/]+/requirements\.md' | grep -v '_template')
if [ -n "$SPEC_FILES" ]; then
  COMPONENT=$(echo "$SPEC_FILES" | head -1 | sed 's|.*docs/specs/\([^/]*\)/.*|\1|')
  PASCAL=$(echo "$COMPONENT" | sed 's/-\([a-z]\)/\U\1/g; s/^\([a-z]\)/\U\1/g')
  COMPONENT_EXISTS=$(find packages/components/src/components/"$COMPONENT" -name "*.tsx" 2>/dev/null | head -1)
  if [ -z "$COMPONENT_EXISTS" ]; then
    SUGGESTIONS+=("📋 Spec de \`$PASCAL\` criada → \`/create-component $PASCAL\` para implementar")
  fi
fi

# Componente criado mas sem testes
COMPONENT_FILES=$(echo "$CHANGED" | grep -E 'packages/components/src/components/[^/]+/[^.]+\.tsx$' | grep -v '\.test\.' | grep -v '\.stories\.')
if [ -n "$COMPONENT_FILES" ]; then
  COMPONENT=$(echo "$COMPONENT_FILES" | head -1 | sed 's|.*components/\([^/]*\)/.*|\1|')
  PASCAL=$(echo "$COMPONENT" | sed 's/-\([a-z]\)/\U\1/g; s/^\([a-z]\)/\U\1/g')
  TEST_EXISTS=$(echo "$CHANGED" | grep "$COMPONENT.*\.test\.")
  if [ -z "$TEST_EXISTS" ]; then
    SUGGESTIONS+=("🧩 \`$PASCAL\` implementado → \`@component-reviewer\` para review antes dos testes")
  fi
fi

# Testes criados mas tasks de acessibilidade não verificadas
TEST_FILES=$(echo "$CHANGED" | grep -E '\.test\.tsx?$')
if [ -n "$TEST_FILES" ]; then
  COMPONENT=$(echo "$TEST_FILES" | head -1 | sed 's|.*components/\([^/]*\)/.*|\1|')
  SUGGESTIONS+=("✅ Testes escritos → \`@a11y-auditor\` para validar WCAG AA nos 3 temas")
fi

# Componente existente modificado (não novo)
MODIFIED=$(echo "$CHANGED" | grep '^ M' | grep -E 'packages/components/src/components/[^/]+/[^.]+\.tsx$' | grep -v '\.test\.' | grep -v '\.stories\.')
if [ -n "$MODIFIED" ]; then
  COMPONENT=$(echo "$MODIFIED" | head -1 | sed 's|.*components/\([^/]*\)/.*|\1|')
  PASCAL=$(echo "$COMPONENT" | sed 's/-\([a-z]\)/\U\1/g; s/^\([a-z]\)/\U\1/g')
  SUGGESTIONS+=("✏️  \`$PASCAL\` modificado → \`@component-reviewer\` para checar regressões")
fi

# Verifica se tasks estão todas concluídas (critério de stable)
TASKS_FILES=$(find docs/specs -name "tasks.md" 2>/dev/null | grep -v '_template')
for TASKS_FILE in $TASKS_FILES; do
  COMPONENT=$(echo "$TASKS_FILE" | sed 's|docs/specs/\([^/]*\)/.*|\1|')
  PASCAL=$(echo "$COMPONENT" | sed 's/-\([a-z]\)/\U\1/g; s/^\([a-z]\)/\U\1/g')
  PENDING=$(grep -c '^\- \[ \]' "$TASKS_FILE" 2>/dev/null || echo 1)
  STABLE_PENDING=$(grep -A5 "Critério de" "$TASKS_FILE" 2>/dev/null | grep -c '^\- \[ \]' || echo 1)
  if [ "$STABLE_PENDING" = "0" ] && [ "$PENDING" = "0" ]; then
    CURRENT_STATUS=$(grep -i 'experimental\|stable' "$TASKS_FILE" 2>/dev/null | head -1)
    if echo "$CURRENT_STATUS" | grep -qi 'experimental\|andamento'; then
      SUGGESTIONS+=("🏆 \`$PASCAL\` com todas as tasks concluídas → \`/promote-stable $PASCAL\`")
    fi
  fi
done

# Exibe sugestões
if [ ${#SUGGESTIONS[@]} -gt 0 ]; then
  echo ""
  echo "💡 Próximo passo sugerido:"
  for S in "${SUGGESTIONS[@]}"; do
    echo "   $S"
  done
  echo ""
fi
