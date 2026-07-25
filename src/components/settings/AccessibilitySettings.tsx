// components/settings/AccessibilitySettings.tsx
// Responsibility: settings panel that surfaces the Phase 6 accessibility
// toggles. Uses bilingual labels (English + Nepali) so the screen is fully
// readable in either language.

import { useAccessibility } from "@/hooks/useAccessibility";
import { SettingsToggle } from "./SettingsToggle";

export function AccessibilitySettings() {
  const { settings, update, reset } = useAccessibility();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground">
          Accessibility · पहुँचयोग्यता
        </h2>
        <p className="text-sm text-muted-foreground">
          Adjust learning to feel calm and clear · तपाईंको सिकाइलाई सहज बनाउनुहोस्।
        </p>
      </div>

      <div className="grid gap-3">
        <SettingsToggle
          label="Large Text"
          labelNp="ठूलो पाठ"
          description="Make text larger"
          descriptionNp="पाठलाई अझै ठूलो बनाउनुहोस्"
          checked={settings.largeText}
          onChange={(next) => update({ largeText: next })}
        />
        <SettingsToggle
          label="Reduce Motion"
          labelNp="कम हालचाल"
          description="Fewer animations"
          descriptionNp="एनिमेसनहरू कम गर्नुहोस्"
          checked={settings.reduceMotion}
          onChange={(next) => update({ reduceMotion: next })}
        />
        <SettingsToggle
          label="Mute Sounds"
          labelNp="आवाज मौन"
          description="Turn off sound feedback"
          descriptionNp="ध्वनि प्रतिक्रिया बन्द गर्नुहोस्"
          checked={settings.muteSounds}
          onChange={(next) => update({ muteSounds: next })}
        />
        <SettingsToggle
          label="High Contrast"
          labelNp="उच्च व्यतिरेक"
          description="Easier to see"
          descriptionNp="अझै देख्न सजिलो हुने पृष्ठभूमि"
          checked={settings.highContrast}
          onChange={(next) => update({ highContrast: next })}
        />
        <SettingsToggle
          label="Colour-Blind Friendly"
          labelNp="रङ-अन्ध मित्र"
          description="For color-difference vision"
          descriptionNp="रङ फरक देख्नेहरूका लागि"
          checked={settings.colorblindMode}
          onChange={(next) => update({ colorblindMode: next })}
        />
        <SettingsToggle
          label="Calm Mode"
          labelNp="स्थिर मोड"
          description="Steady, quiet presentation"
          descriptionNp="दोषरहित र शान्त प्रस्तुति"
          checked={settings.calmMode}
          onChange={(next) => update({ calmMode: next })}
        />
        <SettingsToggle
          label="Dyslexia Font"
          labelNp="डिस्लेक्सिया फन्ट"
          description="Easier-to-read font"
          descriptionNp="पढ्न सजिलो फन्ट प्रयोग"
          checked={settings.dyslexiaFont}
          onChange={(next) => update({ dyslexiaFont: next })}
        />
      </div>

      <button
        type="button"
        onClick={reset}
        className="h-12 rounded-2xl border border-border px-5 text-sm text-foreground transition-all hover:bg-muted focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30"
      >
        Reset to defaults · पूर्वनिर्धारितमा फर्काउनुहोस्
      </button>
    </div>
  );
}
