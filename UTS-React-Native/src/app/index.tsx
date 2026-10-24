import React, { useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { InfoCard } from '../components/InfoCard';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export interface Student {
  id: string;
  nama: string;
  prodi: string;
}

const DAFTAR_MAHASISWA: Student[] = [
  { id: '1', nama: 'Alifia Putri', prodi: 'Information Systems' },
  { id: '2', nama: 'Budi Santoso', prodi: 'Information Technology' },
  { id: '3', nama: 'Citra Dewi', prodi: 'Information Systems' },
  { id: '4', nama: 'Dimas Anggara', prodi: 'Informatics Engineering' },
  { id: '5', nama: 'Eka Nur Safitri', prodi: 'Information Systems' },
];

export default function WorkspaceScreen() {
  const [keyword, setKeyword] = useState<string>('');

  const cleanKeyword = keyword.trim().toLowerCase();

  // Word-boundary prefix matching across first, middle, and last names
  const filteredStudents = DAFTAR_MAHASISWA.filter((student) => {
    if (!cleanKeyword) return true;

    const nameParts = student.nama.toLowerCase().split(/\s+/);
    return nameParts.some((part) => part.startsWith(cleanKeyword));
  });

  const renderDashboardHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.brandContainer}>
        <Text style={styles.brandBadge}>Mobile Workspace</Text>
        <Text style={styles.mainTitle}>Course Dashboard</Text>
        <Text style={styles.mainSubtitle}>
          Real-time overview of active project milestones and enrolled students.
        </Text>
      </View>

      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionTitle}>Project Milestones</Text>
        <Text style={styles.sectionCount}>2 Items</Text>
      </View>

      <InfoCard
        title="React Native Reusable Architecture"
        status="selesai"
        description="Completed the foundation for modular UI components with strictly typed properties and scalable layout constraints."
      />

      <InfoCard
        title="Interactive Student Directory"
        status="proses"
        description="Currently integrating dynamic filtering algorithms, controlled search bars, and high-performance virtualized lists."
      />

      <View style={[styles.sectionHeaderRow, styles.directorySectionSpacing]}>
        <Text style={styles.sectionTitle}>Student Directory</Text>
        <Text style={styles.sectionCount}>
          {filteredStudents.length} Found
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search student by name..."
          placeholderTextColor="#94A3B8"
          value={keyword}
          onChangeText={setKeyword}
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="while-editing"
        />
      </View>
    </View>
  );

  return (
    <SafeAreaProvider style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <FlatList
        data={filteredStudents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.studentCard}>
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>
                {item.nama.charAt(0).toUpperCase()}
              </Text>
            </View>
            <View style={styles.studentDetails}>
              <Text style={styles.studentName}>{item.nama}</Text>
              <Text style={styles.studentMajor}>{item.prodi}</Text>
            </View>
            <View style={styles.studentIdTag}>
              <Text style={styles.studentIdText}>ID: {item.id}</Text>
            </View>
          </View>
        )}
        ListHeaderComponent={renderDashboardHeader()}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          <View style={styles.emptyStateContainer}>
            <Text style={styles.emptyStateTitle}>Data tidak ditemukan!</Text>
            <Text style={styles.emptyStateDescription}>
              No student records matched &quot;{keyword}&quot;. Try adjusting your search term.
            </Text>
          </View>
        }
        contentContainerStyle={styles.scrollListContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollListContent: {
    paddingHorizontal: 18,
    paddingBottom: 36,
  },
  headerContainer: {
    paddingTop: 12,
    paddingBottom: 6,
  },
  brandContainer: {
    marginBottom: 24,
  },
  brandBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#EFF6FF',
    color: '#2563EB',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 8,
  },
  mainTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.5,
  },
  mainSubtitle: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 4,
    lineHeight: 20,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  directorySectionSpacing: {
    marginTop: 18,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1E293B',
  },
  sectionCount: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  searchContainer: {
    marginBottom: 12,
  },
  searchInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: '#0F172A',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  studentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#4F46E5',
  },
  studentDetails: {
    flex: 1,
  },
  studentName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0F172A',
  },
  studentMajor: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 2,
  },
  studentIdTag: {
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  studentIdText: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
  },
  emptyStateContainer: {
    paddingVertical: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyStateTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#DC2626',
    marginBottom: 4,
  },
  emptyStateDescription: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    maxWidth: 240,
    lineHeight: 18,
  },
});